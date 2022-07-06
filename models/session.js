const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
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
  alternate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'sessions'
})

module.exports = Session
