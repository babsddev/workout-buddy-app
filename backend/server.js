require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
// app.get('/', (req, res) => {
//   res.json({ message: 'welcome to the app' })
// })

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listening for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
