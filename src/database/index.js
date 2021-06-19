const knex = require('knex')
const config = require('../config/knex')

module.exports = knex(config)
