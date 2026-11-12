const sanitizeHtml = require('sanitize-html')
const ApiError = require('../../utils/ApiError')

// Only these class names are allowed in AI-generated HTML.
const ALLOWED_CLASSES = [
  'header',
  'name',
  'contact',
  'section',
  'section-title',
  'summary',
  'skill-row',
  'entry',
  'entry-head',
  'entry-title',
  'entry-meta',
  'entry-sub',
]

const SANITIZE_OPTIONS = {
  allowedTags: [
    'header',
    'section',
    'div',
    'h1',
    'h2',
    'h3',
    'p',
    'ul',
    'li',
    'strong',
    'em',
    'span',
    'a',
    'br',
  ],
  allowedAttributes: {
    '*': ['class'],
    a: ['href'],
  },
  allowedClasses: {
    '*': ALLOWED_CLASSES,
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesAppliedToAttributes: ['href'],
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
}

const TEXT_ONLY_OPTIONS = {
  allowedTags: [],
  allowedAttributes: {},
}

// Extract the body if Gemini returns a complete HTML document.
// Also remove Markdown code fences if Gemini includes them.
function extractFragment(rawHtml) {
  const withoutFences = String(rawHtml || '')
    .replace(/^\s*```(?:html)?\s*/i, '')
    .replace(/\s*```\s*$/, '')

  const body = withoutFences.match(
    /<body\b[^>]*>([\s\S]*?)<\/body>/i,
  )

  return body ? body[1] : withoutFences
}

const MIN_RESUME_TEXT_LENGTH = 200

function sanitizeResumeFragment(rawHtml) {
  const clean = sanitizeHtml(
    extractFragment(rawHtml),
    SANITIZE_OPTIONS,
  )

  const textLength = sanitizeHtml(
    clean,
    TEXT_ONLY_OPTIONS,
  ).trim().length

  if (textLength < MIN_RESUME_TEXT_LENGTH) {
    throw ApiError.badGateway(
      'The AI returned an empty or incomplete resume. Please try again.',
    )
  }

  return clean
}

// All styling is controlled by our backend.
const RESUME_CSS = `
  @page {
    size: A4;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #1a1a1a;
    background: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .header {
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 10px;
    border-bottom: 2px solid #2b3a3a;
  }

  .name {
    font-size: 20pt;
    letter-spacing: 0.02em;
    color: #1f2d2d;
  }

  .contact {
    margin-top: 3px;
    font-size: 9.5pt;
    color: #444;
  }

  .section {
    margin-top: 12px;
  }

  .section-title {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #1f2d2d;
    border-bottom: 1px solid #b9c4c2;
    padding-bottom: 2px;
    margin-bottom: 6px;
  }

  .summary {
    text-align: left;
  }

  .skill-row {
    margin-bottom: 2px;
  }

  .entry {
    margin-bottom: 8px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .entry-title {
    font-size: 10.5pt;
    font-weight: 700;
  }

  .entry-meta {
    font-size: 9.5pt;
    color: #555;
    white-space: nowrap;
  }

  .entry-sub {
    font-size: 9.5pt;
    color: #444;
    font-style: italic;
    margin-top: 1px;
  }

  ul {
    margin: 3px 0 0 16px;
  }

  li {
    margin-bottom: 2px;
  }
`

function renderResumeDocument(rawHtml) {
  const fragment = sanitizeResumeFragment(rawHtml)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src 'unsafe-inline'"
  />
  <title>Resume</title>
  <style>${RESUME_CSS}</style>
</head>
<body>
  <main>${fragment}</main>
</body>
</html>`
}

module.exports = {
  renderResumeDocument,
  sanitizeResumeFragment,
}