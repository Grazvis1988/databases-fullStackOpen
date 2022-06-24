const express = require('express')
const app = express()
require('express-async-errors')
const blogRouter = require('./controlers/blogs')
const userRouter = require('./controlers/users')
const authorsRouter = require('./controlers/authors')
const loginRouter = require('./controlers/login')
const readingListRouter = require('./controlers/readingList')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const middleware = require('./util/middleware')


app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglist', readingListRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

app.use(middleware.errorHandler)

start()
