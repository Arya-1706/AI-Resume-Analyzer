const mongoose = require('mongoose')
const ApiError = require('../utils/ApiError')

// Validates req.body using a Zod schema
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))

    return next(
      ApiError.badRequest(
        details[0]?.message || 'Validation failed',
        details
      )
    )
  }

  req.body = result.data
  next()
}

// Validates MongoDB ObjectIds
const validateObjectId = (paramName) => (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params[paramName])) {
    return next(ApiError.badRequest(`Invalid ${paramName}`))
  }

  next()
}

module.exports = { validateBody, validateObjectId }
