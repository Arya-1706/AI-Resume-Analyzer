export function getScoreMeta(score) {
  if (score >= 80) {
    return {
      className: 'score--high',
      label: 'Strong match for this role',
    }
  }

  if (score >= 60) {
    return {
      className: 'score--mid',
      label: 'Good match, a few gaps to close',
    }
  }

  return {
    className: 'score--low',
    label: 'Low match, focus on the skill gaps',
  }
}


export function formatFileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
