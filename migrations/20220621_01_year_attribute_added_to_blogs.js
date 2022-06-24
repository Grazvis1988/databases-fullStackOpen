const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        isYearCorrect(value) {
          if ((value < 1991) || (value > new Date.getYear())) {
            throw new Error('Only years between 1991 and current year are allowed')
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
