const Blog = require('../models/blog')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id) 
  next()
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'SequelizeValidationError') {
    return response.status(400).send(error.message)
	} else if (error.name === 'SequelizeDatabaseError') {
		return response.status(400).send({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(400).send({ error: "Blog does not exist!" })
  }
	next(error)
}

module.exports = {
  errorHandler,
  blogFinder,
}
