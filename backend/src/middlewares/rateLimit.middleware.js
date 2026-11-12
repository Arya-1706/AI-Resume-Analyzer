const rateLimit = require('express-rate-limit')

const createLimiter = ({ windowMs, limit, message }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  })

const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  message: 'Too many requests. Please slow down.',
})

const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: 'Too many attempts. Try again in 15 minutes.',
})

// AI calls consume Gemini quota and processing resources
const aiLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 15,
  message: 'Hourly AI limit reached. Please try again later.',
})

module.exports = { apiLimiter, authLimiter, aiLimiter }
