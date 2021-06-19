const { resolve } = require('path')
const config = require('./database')

module.exports = {
  client: 'mysql2',
  connection: Object.assign({}, config),
  migrations: {
    directory: resolve(process.cwd(), './src/database/migrations'),
  },
}
