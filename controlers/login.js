const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Router = require('express').Router()
const { User } = require('../models')
const { SECRET } = require('../util/config')

Router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({
    where: {
      username
    }
  })

  const passwordCorrect = bcrypt.compareSync(password, user.passwordhash)

  if(!(user && passwordCorrect)) {
    return res.status(401).json({
       error: "Invalid username or password"
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  res.status(200).json({ token, username: user.username, name: user.name })
})


module.exports = Router
