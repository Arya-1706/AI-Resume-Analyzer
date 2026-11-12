const express = require('express')
const controller = require('./interview.controller')
const upload = require('../../middlewares/upload.middleware')
const { authenticate } = require('../../middlewares/authenticate.middleware')
const { validateBody, validateObjectId } = require('../../middlewares/validate.middleware')
const { aiLimiter } = require('../../middlewares/rateLimit.middleware')
const { createReportSchema } = require('./interview.validation')

const router = express.Router()

router.use(authenticate) // everything below is private

// POST /api/interview - generate a report
router.post(
  '/',
  aiLimiter,
  upload.single('resume'),
  validateBody(createReportSchema),
  controller.createReport,
)

// GET /api/interview - all reports of the logged-in user
router.get('/', controller.listReports)

// GET /api/interview/report/:interviewId - one report
router.get(
  '/report/:interviewId',
  validateObjectId('interviewId'),
  controller.getReport,
)

// POST /api/interview/resume/pdf/:interviewReportId - tailored resume PDF
router.post(
  '/resume/pdf/:interviewReportId',
  aiLimiter,
  validateObjectId('interviewReportId'),
  controller.downloadResumePdf,
)

module.exports = router