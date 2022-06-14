const { DATABASE_URL } = require('./config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Successfully connected to database')
  } catch (err) {
    console.log('Fail to connect to database')
    return process.exit(1)
  }
  return null
}

module.exports = {
  sequelize,
  connectToDatabase
}

