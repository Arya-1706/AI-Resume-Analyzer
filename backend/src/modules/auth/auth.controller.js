const authService = require('./auth.service')
const {
  authCookieOptions,
  clearCookieOptions,
} = require('../../config/cookie')

async function register(req, res) {
  const { user, token } = await authService.register(req.body)

  res.cookie('token', token, authCookieOptions)
  res.status(201).json({
    message: 'User registered successfully',
    user,
  })
}

async function login(req, res) {
  const { user, token } = await authService.login(req.body)

  res.cookie('token', token, authCookieOptions)
  res.status(200).json({
    message: 'User logged in successfully',
    user,
  })
}

async function logout(req, res) {
  await authService.logout(req.cookies.token)

  res.clearCookie('token', clearCookieOptions)
  res.status(200).json({
    message: 'User logged out successfully',
  })
}

async function getMe(req, res) {
  const user = await authService.getCurrentUser(req.user.id)

  res.status(200).json({
    message: 'User details fetched successfully',
    user,
  })
}

// Public endpoint: always returns 200,
// even when the visitor is not logged in.
async function session(req, res) {
  const user = await authService.getSessionUser(req.cookies.token)

  res.status(200).json({ user })
}

module.exports = {
  register,
  login,
  logout,
  getMe,
  session,
}