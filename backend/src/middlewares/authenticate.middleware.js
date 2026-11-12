const jwt = require('jsonwebtoken')
const env = require('../config/env')
const ApiError = require('../utils/ApiError')
const TokenBlacklist = require('../modules/auth/tokenBlacklist.model')

async function authenticate(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    throw ApiError.unauthorized('Token not provided')
  }

  const isBlacklisted = await TokenBlacklist.exists({ token })

  if (isBlacklisted) {
    throw ApiError.unauthorized('Token is invalid. Please login again.')
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET)
  } catch {
    throw ApiError.unauthorized('Invalid token')
  }

  next()
}

module.exports = { authenticate }