const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const ReadingList = require('./readingList')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readings' })

Session.hasMany(User)
User.belongsTo(Session)

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
