const express = require('express')
const app = express()
const {Meetup} = require('./models/meetups.model')
const initializeDatabase  = require('./db/db.connection')

// JSON parsing middleware implemented
app.use(express.json())

// Initial connection to DB
initializeDatabase()


app.get("/", (req, res) => {
  res.send("Hello Web!")
})

// Network port declarations
const PORT = 3000
// Listening to network ports form HTTP requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})