const { z } = require('zod')

const createReportSchema = z.object({
  jobDescription: z
    .string()
    .trim()
    .min(1, 'Job description is required')
    .max(5000, 'Job description is too long (max 5000 characters)'),
  selfDescription: z
    .string()
    .trim()
    .max(5000, 'Self description is too long (max 5000 characters)')
    .default(''),
})

module.exports = { createReportSchema }