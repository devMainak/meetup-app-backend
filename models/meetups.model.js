const mongoose = require('mongoose')

const newSpeaker = new mongoose.Schema({
  name: String,
  position: String,
  profileImage: String
})

const newMeetup = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  speakers: [newSpeaker],
  eventDetails: {
    type: String,
    required: true
  },
  dressCode: {
    type: String,
    enum: ["Formal", "Smart", "Casual", "Classical", "Sporty"]
  },
  isAgeRestricted: {
    type: Boolean,
    default: false
  },
  startingTime: {
    type: String,
    required: true
  },
  closingTime: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true
  },
  eventMode: {
    type: String,
    enum: ["Online", "Offline"],
    required: true
  },
  location: {
    type: String
  },
  entryFees: {
    type: String
  },
  coverImage: {
    type: String,
    required: true
  },
  eventTags:[{
    type: String
  }]
})

const Speaker = mongoose.model("Speakers", newSpeaker)
const MeetUp = mongoose.model("Meetups", MeetUp)

module.exports = {MeetUp, Speaker}