import { Link } from 'react-router-dom'
import ReportView from '../../interview/components/review/ReportView'
import sampleReport from '../sample.report'

export default function Sample() {
  return (
    <main className='sample'>
      <div className='sample__banner'>
        <p>
          <strong>This is a sample report</strong> with made up data, so you
          can see what you get.
        </p>

        <Link to='/analyze' className='button primary-button'>
          Analyze my resume
        </Link>
      </div>

      <ReportView report={sampleReport} readOnly />
    </main>
  )
}