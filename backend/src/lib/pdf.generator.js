const env = require('../config/env')

async function launchBrowser() {
  if (env.isVercel) {
    // Production: puppeteer-core plus Chromium for serverless
    const chromium = (await import('@sparticuz/chromium')).default
    const puppeteer = require('puppeteer-core')

    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    })
  }

  // Local development: normal Puppeteer with downloaded Chrome
  const puppeteer = require('puppeteer')
  return puppeteer.launch()
}

async function htmlToPdf(html) {
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    // The HTML is AI generated, so never let it run scripts
    // or make external network requests.
    await page.setJavaScriptEnabled(false)
    await page.setRequestInterception(true)

    page.on('request', (request) => {
      const url = request.url()

      if (url.startsWith('data:') || url === 'about:blank') {
        request.continue()
      } else {
        request.abort()
      }
    })

    await page.setContent(html, { waitUntil: 'load' })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '14mm',
        bottom: '14mm',
        left: '14mm',
        right: '14mm',
      },
    })

    // Puppeteer may return a Uint8Array.
    // Convert it to a Node.js Buffer for Express.
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}

module.exports = { htmlToPdf }