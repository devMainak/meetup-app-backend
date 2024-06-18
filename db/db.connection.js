const mongoose = require("mongoose")

const mongoURI = process.env['MONGODB']

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI)
    if (connection) {
      console.log("Connected Successfully.")
    }
  } catch (error) {
    throw error
  }
}

module.exports = initializeDatabase