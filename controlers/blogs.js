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

Router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id) 
  if (blog) {
    await blog.destroy()
    res.status(204).end();
  } else {
    res.status(400).end();
  }
})

module.exports = Router
