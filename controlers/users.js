const Router = require('express').Router()
const { User, Blog } = require('../models')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../util/config')

Router.get('/', async (req, res) => {
  const Users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'id']
    }
  })
  console.log(JSON.stringify(Users, null, 2))
  res.status(200).json(Users)
})

Router.post('/', async (req, res) => {
  const { password, username, name } = req.body
  if (!( username && name && password )) {
    return res.status(401).json({
       error: "Missing attributes: username, name or password"
    })
  }
  const passwordHash = bcrypt.hashSync(password, parseInt(SALT_ROUNDS))
  const user = await User.create({ name, username, passwordHash })
  res.status(200).json(User)
})

Router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  await user.update({ username: req.body.username })
  await user.save()
  res.status(200).json(user)
})

module.exports = Router
