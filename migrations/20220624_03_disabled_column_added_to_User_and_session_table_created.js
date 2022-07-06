const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: { model: 'users', key: 'id' },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      alternate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    })
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
    await queryInterface.addColumn('users', 'session_id', {
      type: DataTypes.INTEGER,
      reference: { model: 'sessions', key: 'id'}
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions')
    await queryInterface.removeColumn('users', 'disabled')
  },
}
