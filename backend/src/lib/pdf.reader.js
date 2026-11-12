// Order matters: the worker import must come before pdf-parse
// on serverless runtimes.
const { CanvasFactory } = require('pdf-parse/worker')
const { PDFParse } = require('pdf-parse')

async function extractPdfText(buffer) {
  const parser = new PDFParse({
    data: new Uint8Array(buffer),
    CanvasFactory,
  })

  try {
    const result = await parser.getText()
    return result.text.trim()
  } finally {
    await parser.destroy()
  }
}

module.exports = { extractPdfText }