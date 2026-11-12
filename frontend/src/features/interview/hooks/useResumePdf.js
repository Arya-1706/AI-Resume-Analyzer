import { useCallback, useState } from 'react'
import { generateResumePdf } from '../services/interview.api'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export function useResumePdf() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const download = useCallback(async (interviewReportId) => {
    setLoading(true)
    setError('')

    try {
      const blob = await generateResumePdf({ interviewReportId })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `resume_${interviewReportId}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  return { download, loading, error }
}