const DBPassword = require('../helpers/DBPassword')

module.exports = {
  database: process.env.MYSQL_DATABASE,
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.MYSQL_USER,
  password: DBPassword.getInstance().get()
}
