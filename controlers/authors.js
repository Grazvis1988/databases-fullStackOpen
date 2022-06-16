const { User, Blog } = require('../models')
const Router = require('express').Router()
const { fn, col } = require('sequelize')

Router.get('/', async (req, res) => {

  const blogs = await Blog.findAll({ 
    group:  'author',
    attributes: [
      'author',
      [fn('COUNT',col('title')), 'articles'],
      [fn('sum',col('likes')), 'likes']
    ],
    order: [
      [col('likes'), 'DESC']
    ]
  })
  console.log(JSON.stringify(blogs, null, 2))
  res.status(200).json(blogs)

})

module.exports = Router
