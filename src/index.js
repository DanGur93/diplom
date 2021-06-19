const http = require('http')
const Koa = require('koa')

const knex = require('./database/index')
const config = require('./config/app')

const app = new Koa()
const { host, port } = config

console.log(host, port);
const server = http.createServer(app.callback())

// setting app proxy to get real clients IPs
app.proxy=true

const tryConnect = async (attempts) => {
  for (let i = 0; i < attempts; i += 1) {
    console.log(`--- Attempting to connect to database: ${i + 1}`)
    await knex.raw('select 1+1 as result')
      .then(() => {
        console.log({ message: '--- Database connected' })
        i = attempts
      })
      .catch((error) => {
        console.log(new Error('--- Database connection error'))
        console.log(error.message)
      })

    if (i === attempts) break

    const timeout = new Promise(r => setTimeout(r, 3000))
    await timeout
  }

  server.listen(port, host, () => {
    console.log({
      message: `--- Server launched at http://${host}:${port}/`
    })
  })
}

app.use(async (ctx, next) => {
  await next();

  await knex('log').insert({ data: `ip: ${ctx.request.ip}` })

  const logs = await knex('log').select(['*'])

  let logsString = ''

  logs.forEach((log) => {
    logsString = `${logsString}${log.id} | ${log.data} | ${log.created_at}\n`
  })

  ctx.body = logsString;
});

tryConnect(3)

module.exports = server
