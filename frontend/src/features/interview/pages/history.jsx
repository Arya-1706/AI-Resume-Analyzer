import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.scss'
import { useReports } from '../hooks/useReports'
import ReportList from '../components/ReportList'
import FullPageLoader from '../../../shared/components/FullPageLoader'

export default function History() {
  const navigate = useNavigate()
  const { reports, loading, error } = useReports()

  if (loading) {
    return <FullPageLoader message='Loading your history...' />
  }

  return (
    <div className='home-page'>
      <header className='page-header'>
        <h1>
          Your <span className='highlight'>History</span>
        </h1>

        <p>Every analysis you have generated, newest first.</p>
      </header>

      {error && <p className='form-error'>{error}</p>}

      {reports.length === 0 && !error ? (
        <div className='card empty-state'>
          <p>You have not analysed anything yet.</p>

          <Link to='/analyze' className='button primary-button'>
            Analyze a resume
          </Link>
        </div>
      ) : (
        <ReportList
          reports={reports}
          title={null}
          onSelect={(id) => navigate(`/history/${id}`)}
        />
      )}
    </div>
  )
}