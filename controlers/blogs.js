const Router = require('express').Router()
const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor }= require('../util/middleware')
const { Op } = require("sequelize");

Router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where.title = {
      [Op.iRegexp]: req.query.search
    }
  }
  const blogs = await Blog.findAll({ 
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  console.log(JSON.stringify(blogs, null, 2))
  res.status(200).json(blogs)
})

Router.post('/', tokenExtractor, async (req, res) => {
  console.log(req.body)
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id})
  res.status(200).json(blog)
})


Router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if ( req.blog.userId === req.decodedToken.id){ 
    await req.blog.destroy()
    res.status(204).end();
  } else {
    res.status(403).json({
      error: "Current user is not allowed to delete blog!"
    })
  }
})

Router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.status(200).json(req.blog)
})

Router.get('/:id', blogFinder, async (req, res) => {
  res.status(200).json(req.blog)
})


module.exports = Router
