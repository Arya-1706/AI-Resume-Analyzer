const ApiError = require('../../utils/ApiError')
const { extractPdfText } = require('../../lib/pdf.reader')
const { htmlToPdf } = require('../../lib/pdf.generator')
const {
  generateInterviewReport,
  generateResumeHtml,
} = require('./ai/interview.ai')
const InterviewReport = require('./interview.model')
const { renderResumeDocument } = require('./resume.render')



async function readResume(file) {
  if (!file) return ''

  let text

  try {
    text = await extractPdfText(file.buffer)
  } catch {
    throw ApiError.badRequest('We could not read this PDF. Try another file.')
  }

  if (!text) {
    throw ApiError.badRequest(
      'No text found in this PDF. If it is a scanned image, describe your experience in the self description instead.',
    )
  }

  return text
}


async function createReport({ userId, file, jobDescription, selfDescription }) {
  if (!file && !selfDescription) {
    throw ApiError.badRequest('Upload a resume PDF or add a self description')
  }

  const resume = await readResume(file)

  const aiReport = await generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
  })

  // aiReport is validated against a schema, so only known fields get saved.
  return InterviewReport.create({
    user: userId,
    resume,
    resumeFile: file
      ? { name: file.originalname, size: file.size }
      : undefined,
    selfDescription,
    jobDescription,
    ...aiReport,
  })
}


async function getReportById(reportId, userId) {
  const report = await InterviewReport.findOne({
    _id: reportId,
    user: userId,
  })

  if (!report) {
    throw ApiError.notFound('Interview report not found.')
  }

  return report
}


async function getReportDetails(reportId, userId) {
  const report = await getReportById(reportId, userId)

  const previous = await InterviewReport.findOne({
    user: userId,
    createdAt: { $lt: report.createdAt },
  })
    .sort({ createdAt: -1 })
    .select('matchScore')
    .lean()

  return {
    ...report.toObject(),
    previousMatchScore: previous?.matchScore ?? null,
  }
}


async function listReports(userId) {
  return InterviewReport.find({ user: userId })
    .sort({ createdAt: -1 })
    .select('title matchScore user createdAt updatedAt')
    .lean()
}

async function generateResumePdf(reportId, userId) {
  const report = await getReportById(reportId, userId)

  const html = await generateResumeHtml({
    resume: report.resume,
    selfDescription: report.selfDescription,
    jobDescription: report.jobDescription,
  })

  const document = renderResumeDocument(html)

  return htmlToPdf(document)
}

module.exports = {
  createReport,
  getReportById,
  getReportDetails,
  listReports,
  generateResumePdf,
}