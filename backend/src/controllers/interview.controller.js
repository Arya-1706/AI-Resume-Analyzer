const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model") 

async function geenrateInterviewReportController(req, res) {
  const resumeFile = req.file

  const resumeContent = pdfParse(req.file.buffer)
  const {selfDescription, jobdescription } = req.body

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobdescription
  })

  const interviewReport = await interviewReportModel.create({
    user: req.user.id
  })
}

module.exports = { geenrateInterviewReportController}