const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')

const env = require('./config/env')
const { apiLimiter } = require('./middlewares/rateLimit.middleware')
const { notFound, errorHandler } = require('./middlewares/error.middleware')
const authRouter = require('./modules/auth/auth.routes')
const interviewRouter = require('./modules/interview/interview.routes')
const connectToDB = require('./config/database')

const app = express()

// Backend runs behind a proxy in production
if (env.isProd) app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.CORS_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Connect on the first request that needs it
app.use(async (req, res, next) => {
  await connectToDB()
  next()
})

app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

// These must stay last
app.use(notFound)
app.use(errorHandler)

module.exports = app
