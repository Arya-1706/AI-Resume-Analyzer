
const assert = require('node:assert/strict')
const {
  renderResumeDocument,
} = require('../src/modules/interview/resume.render')

const filler =
  'Built and shipped a full-stack project using React, Node.js and MongoDB. '.repeat(4)

const malicious = `
\`\`\`html
<header class="header" onclick="alert(1)">
  <h1 class="name">Test User</h1>
</header>

<style>
  body { background: url(https://evil.example/track.png); }
</style>

<script>
  fetch('https://evil.example')
</script>

<img src="https://evil.example/pixel.png" onerror="alert(1)">

<iframe src="https://evil.example"></iframe>

<p class="contact evil-class" style="position:fixed">
  test@example.com
</p>

<a href="javascript:alert(1)">Bad link</a>

<a href="mailto:test@example.com">Good link</a>

<section class="section">
  <h2 class="section-title">Summary</h2>
  <p class="summary">${filler}</p>
</section>
\`\`\`
`

const doc = renderResumeDocument(malicious)

// Security checks
assert(!/onclick|onerror/i.test(doc), 'Event handlers must be removed')

assert(!/evil\.example/i.test(doc), 'External malicious URLs must be removed')

assert(!/<script|<iframe|<img/i.test(doc), 'Dangerous elements must be removed')

assert(!/javascript:/i.test(doc), 'JavaScript links must be removed')

assert(!/style="/i.test(doc), 'Inline styles must be removed')

assert(!/evil-class/i.test(doc), 'Unknown classes must be removed')

assert(!/```/.test(doc), 'Markdown code fences must be removed')

// Our backend should add exactly one stylesheet.
assert(
  (doc.match(/<style>/g) || []).length === 1,
  'Only our own stylesheet should remain',
)

// Safe contact links and approved classes should survive.
assert(
  /mailto:test@example\.com/.test(doc),
  'Mailto links must survive',
)

assert(
  /class="name"/.test(doc) && /class="section-title"/.test(doc),
  'Approved classes must survive',
)

// Empty or malicious-only resumes must be rejected.
assert.throws(
  () => renderResumeDocument('<script>alert(1)</script>'),
  'A resume without meaningful text must be rejected',
)

console.log('All sanitizer checks passed!')
