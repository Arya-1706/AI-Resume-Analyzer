const interviewService = require('./interview.service')

async function createReport(req, res) {
  const interviewReport = await interviewService.createReport({
    userId: req.user.id,
    file: req.file,
    jobDescription: req.body.jobDescription,
    selfDescription: req.body.selfDescription,
  })

  res.status(201).json({
    message: 'Interview report generated successfully.',
    interviewReport,
  })
}

async function getReport(req, res) {
  const interviewReport = await interviewService.getReportDetails(
    req.params.interviewId,
    req.user.id
  )

  res.status(200).json({
    message: 'Interview report fetched successfully.',
    interviewReport,
  })
}

async function listReports(req, res) {
  const interviewReports = await interviewService.listReports(req.user.id)

  res.status(200).json({
    message: 'Interview reports fetched successfully.',
    interviewReports,
  })
}

async function downloadResumePdf(req, res) {
  const { interviewReportId } = req.params

  const pdf = await interviewService.generateResumePdf(
    interviewReportId,
    req.user.id,
  )

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
  })

  res.send(pdf)
}

module.exports = {
  createReport,
  getReport,
  listReports,
  downloadResumePdf,
}