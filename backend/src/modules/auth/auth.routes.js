const express = require('express')
const controller = require('./auth.controller')
const { validateBody } = require('../../middlewares/validate.middleware')
const { authenticate } = require('../../middlewares/authenticate.middleware')
const { authLimiter } = require('../../middlewares/rateLimit.middleware')
const { registerSchema, loginSchema } = require('./auth.validation')

const router = express.Router()

// GET /api/auth/session - check current session (public)
router.get('/session', controller.session)

// POST /api/auth/register - create an account
router.post(
  '/register',
  authLimiter,
  validateBody(registerSchema),
  controller.register
)

// POST /api/auth/login - log in
router.post(
  '/login',
  authLimiter,
  validateBody(loginSchema),
  controller.login
)

// GET /api/auth/logout - clear cookie and blacklist token
router.get('/logout', controller.logout)

// GET /api/auth/get-me - current logged-in user
router.get('/get-me', authenticate, controller.getMe)

module.exports = router