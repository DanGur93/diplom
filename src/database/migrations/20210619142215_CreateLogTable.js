exports.up = (knex) => {
  return knex.schema.createTable('log', (table) => {
    table.increments('id')
    table.string('data')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}


exports.down = (knex) => {
  return knex.schema.dropTableIfExists('log')
}
