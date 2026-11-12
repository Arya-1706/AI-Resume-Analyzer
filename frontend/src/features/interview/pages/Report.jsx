import { Link, useParams } from 'react-router-dom'
import { useReport } from '../hooks/useReport'
import { useResumePdf } from '../hooks/useResumePdf'
import FullPageLoader from '../../../shared/components/FullPageLoader'
import ReportView from '../components/review/ReportView'

export default function Report() {
  const { reportId } = useParams()

  const { report, loading, error } = useReport(reportId)

  const {
    download,
    loading: downloading,
    error: downloadError,
  } = useResumePdf()

  if (loading) {
    return <FullPageLoader message='Loading your analysis...' />
  }

  if (error || !report) {
    return (
      <main className='loading-screen'>
        <h1>{error || 'Analysis not found'}</h1>

        <Link to='/history' className='button primary-button'>
          Back to History
        </Link>
      </main>
    )
  }

  return (
    <ReportView
      report={report}
      onDownload={() => download(reportId)}
      downloading={downloading}
      error={downloadError}
    />
  )
}