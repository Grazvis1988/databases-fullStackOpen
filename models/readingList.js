const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: { model: 'blogs', key: 'id' },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list'
})

module.exports = ReadingList
