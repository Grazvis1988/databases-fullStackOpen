const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Router = require('express').Router()
const { User, Session } = require('../models')
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

  console.log("userId", user.id)
  const session = await Session.create({ user_id: user.id })
  console.log('#########################################################################')
  console.log( "Session", session )

  res.status(200).json({ 
    token,
    username: user.username, 
    name: user.name,
    sessionId: session.id
  })
})


module.exports = Router
