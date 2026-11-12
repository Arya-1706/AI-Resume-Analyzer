const env = require('./src/config/env')
const app = require('./src/app')
const connectToDB = require('./src/config/database')

if (!env.isVercel) {
  connectToDB().catch((error) => {
    console.error('Failed to connect to the database:', error)
    process.exit(1)
  })
}

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})