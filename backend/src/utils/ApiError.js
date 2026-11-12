
class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
    this.isOperational = true // expected error: safe to show its message to the client
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message = 'Bad request', details) {
    return new ApiError(400, message, details)
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message)
  }

  static notFound(message = 'Not found') {
    return new ApiError(404, message)
  }

  static conflict(message = 'Conflict') {
    return new ApiError(409, message)
  }

  static badGateway(message = 'Upstream service failed') {
    return new ApiError(502, message)
  }
}

module.exports = ApiError
