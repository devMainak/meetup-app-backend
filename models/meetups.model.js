const mongoose = require('mongoose')

// Schema for speakers
const newSpeaker = new mongoose.Schema({
  name: String,
  position: String,
  profileImage: String
})

// Schema for Meetups data
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
    enum: ["Online", "Offline", "Both"],
    default: "Both",
    required: true
  },
  location: {
    type: String
  },
  entryFees: {  
    type: Number,
    default: 0
  },
  coverImage: {
    type: String,
    required: true
  },
  eventTags:[{
    type: String
  }],
  website: {
    type: String,
  }
})

// Model for those Schemas
const Speaker = mongoose.model("Speakers", newSpeaker)
const MeetUp = mongoose.model("Meetups", newMeetup)

// exporting models
module.exports = {MeetUp, Speaker}