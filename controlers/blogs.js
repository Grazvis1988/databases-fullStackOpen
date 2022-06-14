const Router = require('express').Router()
const Blog = require('../models/blog')

Router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.status(200).json(blogs)
})

Router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id) 
  next()
}

Router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(204).end();
  } else {
    res.status(400).end();
  }
})

Router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog && req.body.likes) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.status(204).json(req.blog)
  } else {
    res.status(400).end()
  }
})

module.exports = Router
