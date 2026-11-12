const { z } = require('zod')

const email = z.string()
  .trim()
  .toLowerCase()
  .pipe(z.email('Please enter a valid email address'))

const registerSchema = z.object({
  username: z.string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username is too long'),

  email,

  // bcrypt only uses the first 72 bytes
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long'),
})

const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
})

module.exports = { registerSchema, loginSchema }
