import { useCallback, useState } from 'react'
import { generateInterviewReport } from '../services/interview.api'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export function useGenerateReport() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = useCallback(async (input) => {
    setLoading(true)
    setError('')

    try {
      const data = await generateInterviewReport(input)
      return data.interviewReport
    } catch (err) {
      setError(getErrorMessage(err))
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { generate, loading, error }
}