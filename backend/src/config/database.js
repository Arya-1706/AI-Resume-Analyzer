const mongoose = require('mongoose')
const env = require('./env')

// Cache the connection promise across requests
let connectionPromise = null

function connectToDB() {
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
      .then(() => {
        console.log('Connected to Database')
      })
      .catch((error) => {
        connectionPromise = null // Allow retry on the next request
        throw error
      })
  }

  return connectionPromise
}

module.exports = connectToDB