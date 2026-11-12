import { useEffect, useState } from 'react'
import { getAllInterviewReports } from '../services/interview.api'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export function useReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    getAllInterviewReports()
      .then((data) => {
        if (!ignore) setReports(data.interviewReports)
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
  }, [])

  return { reports, loading, error }
}