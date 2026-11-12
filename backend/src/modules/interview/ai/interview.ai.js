const { generateStructured } = require('../../../lib/gemini.client')
const { interviewReportSchema, resumeHtmlSchema } = require('./schemas')
const prompts = require('./prompts')

async function generateInterviewReport(input) {
  return generateStructured({
    systemInstruction: prompts.REPORT_SYSTEM_INSTRUCTION,
    prompt: prompts.buildReportPrompt(input),
    schema: interviewReportSchema,
  })
}

async function generateResumeHtml(input) {
  const result = await generateStructured({
    systemInstruction: prompts.RESUME_SYSTEM_INSTRUCTION,
    prompt: prompts.buildResumePrompt(input),
    schema: resumeHtmlSchema,
  })

  return result.html
}

module.exports = {
  generateInterviewReport,
  generateResumeHtml,
}