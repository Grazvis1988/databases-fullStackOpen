const express = require('express')
const app = express()
require('express-async-errors')
const blogRouter = require('./controlers/blogs')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const middleware = require('./util/middleware')


app.use(express.json())
app.use('/api/blogs', blogRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

app.use(middleware.errorHandler)

start()
