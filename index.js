const express = require('express')
const app = express()
const {MeetUp} = require('./models/meetups.model')
const initializeDatabase  = require('./db/db.connection')

// JSON parsing middleware implemented
app.use(express.json())

// Initial connection to DB
initializeDatabase()

// Function to save a meetup to DB
const saveMeetUp = async (meetUpData) => {
  try {
    const meetUpToSave = new MeetUp(meetUpData)
    const savedMeetUp = await meetUpToSave.save()
    return savedMeetUp
  } catch(error) {
    throw error
  }
}

// POST method on "/meetup route to save meetup data in Database"
app.post("/meetups", async (req, res) => {
  try {
    const savedMeetUp = await saveMeetUp(req.body)
    if (!savedMeetUp) {
      res.status(400)
      .json({error: "Failed to save meetup data."})
    } else {
      res.status(201)
      .json({message: "MeetUp added successfully."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Internal Server Error."})
  }
})

// Function to get all the meetups
const readAllMeetUps = async () => {
  try {
    const meetUps = await MeetUp.find()
    return meetUps
  } catch (error) {
    throw error
  }
}

// GET method on "/" route to get all the meetups
app.get("/meetups", async (req, res) => {
  try {
    const allMeetUps = await readAllMeetUps()
    if (allMeetUps.length != 0)
    {
      res.status(200)
      .send(allMeetUps)
    } else {
      res.status(400)
      .json({error: "Failed to fetch meetups"})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Internal Server Error."})
    }
})

// Function to read meetup data by id
const readMeetUpById = async (meetUpId) => {
  try {
    const meetUpBtId = await MeetUp.findById(meetUpId)
    return meetUpBtId
  } catch (error) {
    throw error
  }
}

// GET method on "/meetups/:meetUpId" to read a meetUp data by Id
app.get("/meetups/:meetUpId", async (req, res) => {
  try {
    const meetUpById = await readMeetUpById(req.params.meetUpId)
    if (!meetUpById) {
      res.status(400)
      .json({error: "Failed to fetch meetup details."})
    } else {
      res.status(200)
      .send(meetUpById)
    }
  } catch(error) {
    console.error(error)
    res.status(500)
    .json({error: "Internal Server Error."})
  }
})

// Function to update data of meetup by Id
const updateMeetUpDataById = async (meetUpId, dataToUpdate) => {
  try {
   const updatedMeetUp = await MeetUp.findByIdAndUpdate(meetUpId, dataToUpdate, {new: true})
    console.log(updatedMeetUp)
    return updatedMeetUp
  } catch (error) {
    throw error
  }
}

// POST method on /meetups/:meetUpId to update data by id of meetup
app.post("/meetups/:meetUpId", async (req, res) => {
  try {
    const updatedMeetUp = await updateMeetUpDataById(req.params.id, req.body)
    if (!updatedMeetUp) {
      res.status(400)
      .json({error: "Meetup not found"})
    } else {
      res.status(201)
      .json({message: "Meetup updated successfully", updatedMeetUp: updatedMeetUp})
    }
  } catch(error) {
    console.error(error)
    res.status(500)
    .json({error: "Internal Server Error."})
  }
})


// Network port declarations
const PORT = 3000
// Listening to network ports form HTTP requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})