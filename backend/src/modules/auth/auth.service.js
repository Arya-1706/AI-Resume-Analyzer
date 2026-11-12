const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('../../config/env')
const ApiError = require('../../utils/ApiError')
const User = require('./user.model')
const TokenBlacklist = require('./tokenBlacklist.model')

const signToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username },
    env.JWT_SECRET,
    { expiresIn: '1d' }
  )

const toPublicUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
})

async function register({ username, email, password }) {
  const exists = await User.exists({
    $or: [{ username }, { email }],
  })

  if (exists) {
    throw ApiError.conflict(
      'Account already exists with this email address or username'
    )
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    email,
    password: hash,
  })

  return {
    user: toPublicUser(user),
    token: signToken(user),
  }
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+password')

  const isValid = user && (await bcrypt.compare(password, user.password))

  if (!isValid) {
    throw ApiError.unauthorized('Invalid email or password')
  }

  return {
    user: toPublicUser(user),
    token: signToken(user),
  }
}

async function logout(token) {
  if (token) {
    await TokenBlacklist.create({ token })
  }
}

async function getCurrentUser(userId) {
  const user = await User.findById(userId)

  if (!user) {
    throw ApiError.notFound('User not found')
  }

  return toPublicUser(user)
}

// Used by public pages: a visitor who is not logged in
// is a normal case, not an error.
async function getSessionUser(token) {
  if (!token) return null

  if (await TokenBlacklist.exists({ token })) return null

  try {
    const payload = jwt.verify(token, env.JWT_SECRET)
    return await getCurrentUser(payload.id)
  } catch {
    return null
  }
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getSessionUser,
}