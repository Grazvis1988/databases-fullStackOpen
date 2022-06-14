const Router = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../util/middleware')

Router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.status(200).json(blogs)
})

Router.post('/', async (req, res) => {
  console.log(req.body)
  const blog = await Blog.create(req.body)
  res.status(200).json(blog)
})


Router.delete('/:id', middleware.blogFinder, async (req, res) => {
  await req.blog.destroy()
  res.status(204).end();
})

Router.put('/:id', middleware.blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.status(200).json(req.blog)
})

module.exports = Router
