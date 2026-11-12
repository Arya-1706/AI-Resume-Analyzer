import { useEffect, useState } from 'react'
import { getInterviewReportById } from '../services/interview.api'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export function useReport(reportId) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')

    getInterviewReportById(reportId)
      .then((data) => {
        if (!ignore) setReport(data.interviewReport)
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [reportId])

  return { report, loading, error }
}