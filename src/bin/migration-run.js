const Knex = require('knex')
const config = require('../config/knex')

const args = process.argv.slice(2)

const direction = args[0]

if (!direction) {
  throw Error(`Direction not specified (first argument: up | down | rollback | latest)`)
}

const runMigrations = (direction) => {
  const knex = Knex({
    client: config.client,
    connection: config.connection,
    migrations: {
      directory: config.migrations.directory
    }
  })

  knex.migrate[direction]()
    .then(function() {
      console.log('successfuly')
      process.exit(0)
    });
}

if (direction === 'up' || direction === 'down' || direction === 'rollback' || direction === 'latest') {
  console.log(`Running migrations`);
  runMigrations(direction)
} else {
  throw Error('Unsupported direction (up | down | rollback | latest)')
}