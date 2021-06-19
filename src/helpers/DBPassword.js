const fs = require('fs')

module.exports = class DBPassword {
  password
  static instance

  static getInstance () {
    if (!DBPassword.instance) {
      this.instance = new DBPassword();
    }

    return this.instance
  }

  get () {
    if (!this.password) {
      try {
        this.password = fs.readFileSync(process.env.db_password, 'utf8').trimRight()
      } catch (e) {
        console.log('Postgres password is not a path to file. Using as is.')

        this.password = process.env.MYSQL_PASSWORD.trimRight()
      }
    }

    return this.password
  }
}
