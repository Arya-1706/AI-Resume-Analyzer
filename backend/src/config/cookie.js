const env = require('./env')

const ONE_DAY_MS = 24 * 60 * 60 * 1000

// The frontend proxies /api to this backend.
// Lax works for our same-site setup.
const baseOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: 'lax',
}

module.exports = {
  authCookieOptions: { ...baseOptions, maxAge: ONE_DAY_MS },
  clearCookieOptions: baseOptions,
}