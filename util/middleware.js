const { Blog } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id) 
  next()
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }
  next()
}


const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message, type: 'SequelizeValidationError' })
	} else if (error.name === 'SequelizeDatabaseError') {
		return response.status(400).send({ error: error.message, type: 'SequelizeDatabaseError' })
  } else if (error.name === 'TypeError') {
    return response.status(400).send({ error: error.message, type: 'TypeError' })
  }
	next(error)
}

module.exports = {
  errorHandler,
  blogFinder,
  tokenExtractor,
}
