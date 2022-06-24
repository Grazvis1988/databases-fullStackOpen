const Router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../util/config')

Router.get('/', async (req, res) => {
  const Users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'id' ]
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
  const passwordhash = bcrypt.hashSync(password, parseInt(SALT_ROUNDS))
  const user = await User.create({ name, username, passwordhash })
  res.status(200).json(user)
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

Router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: [ 'name', 'username' ] ,
    include: [{
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      through: {
        attributes: [] 
      }
    }]
  })
  res.status(200).json(user)
})

module.exports = Router
