const mongoose = require("mongoose")

// Connection string for DB
const mongoURI = process.env['MONGODB']

// Initializing connection to DB
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

//Exporting the functions
module.exports = initializeDatabase