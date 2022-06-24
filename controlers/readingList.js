const Router = require('express').Router()
const { tokenExtractor }= require('../util/middleware')
const { ReadingList } = require('../models')

Router.post('/', tokenExtractor, async (req, res) => {
  const listItem = await ReadingList.create({ 
    userId: req.decodedToken.id,
    blogId: req.body.blogId
  })
  res.status(200).json(listItem)
})


module.exports = Router
