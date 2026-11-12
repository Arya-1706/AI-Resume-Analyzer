const multer = require('multer')
const env = require('../config/env')
const ApiError = require('../utils/ApiError')

function notFound(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`))
}

// Express recognises an error handler by its 4 arguments
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err)

  let statusCode = err.statusCode || 500
  let message = err.message
  const details = err.details

  if (err instanceof multer.MulterError) {
    statusCode = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400
    message = err.code === 'LIMIT_FILE_SIZE'
      ? 'File is too large. Maximum size is 4MB.'
      : err.message
  } else if (err.type === 'entity.parse.failed') {
    statusCode = 400
    message = 'Request body is not valid JSON'
  } else if (err.code === 11000) {
    // Mongo duplicate key
    statusCode = 409
    message = 'Account already exists with this email address or username'
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid id'
  } else if (!err.isOperational && !err.expose) {
    console.error(err)
    statusCode = 500
    message = env.isProd ? 'Something went wrong' : err.message
  }

  res.status(statusCode).json({
    message,
    ...(details && { details }),
    ...(!env.isProd && statusCode === 500 && { stack: err.stack }),
  })
}

module.exports = { notFound, errorHandler }
