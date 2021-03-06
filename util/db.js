const { DATABASE_URL } = require('./config')
const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    freezeTableName: true
  }
})

const migrationsConf = {
  migrations: {
    glob: './migrations/*.js'
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationsConf)
  const migrations = await migrator.up()
  console.log('migrations up to date', {
    files: migrations.map(m => m.name)
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Successfully connected to database')
  } catch (err) {
    console.log('Fail to connect to database', {
      error: err
    })
    return process.exit(1)
  }
  return null
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationsConf)
  await migrator.down()
}

module.exports = {
  sequelize,
  connectToDatabase,
  rollbackMigration
}

