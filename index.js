const express = require('express')
const app = express()
const blogRouter = require('./controlers/blogs')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(express.json())
app.use('/api/blogs', blogRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

start()
