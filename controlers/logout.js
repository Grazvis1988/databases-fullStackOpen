const Router = require('express').Router()
const { tokenExtractor }= require('../util/middleware')
const { Session } = require('../models')

Router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      user_id: req.decodedToken.id
    }
  })

  res.status(204).end()
})


module.exports = Router
