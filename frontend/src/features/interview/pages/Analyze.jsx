import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/home.scss'
import { useReports } from '../hooks/useReports'
import { useGenerateReport } from '../hooks/useGenerateReport'
import { MAX_RESUME_SIZE_MB } from '../interview.constants'
import JobDescriptionPanel from '../components/JobDescriptionPanel'
import ProfilePanel from '../components/ProfilePanel'
import ReportList from '../components/ReportList'
import { StarIcon } from '../components/icons'
import FullPageLoader from '../../../shared/components/FullPageLoader'

export default function Analyze() {
  const navigate = useNavigate()
  const { reports } = useReports()
  const {
    generate,
    loading: generating,
    error: generateError,
  } = useGenerateReport()

  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [formError, setFormError] = useState('')

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      return setFormError('Please paste the job description.')
    }

    if (!resumeFile && !selfDescription.trim()) {
      return setFormError(
        'Upload your resume or add a short self description.'
      )
    }

    if (
      resumeFile &&
      resumeFile.size > MAX_RESUME_SIZE_MB * 1024 * 1024
    ) {
      return setFormError(
        `The resume must be smaller than ${MAX_RESUME_SIZE_MB}MB.`
      )
    }

    setFormError('')

    const report = await generate({
      jobDescription,
      selfDescription,
      resumeFile,
    })

    if (report) navigate(`/history/${report._id}`)
  }

  if (generating) {
    return (
      <FullPageLoader message='Building your interview plan. This takes about 30 seconds...' />
    )
  }

  return (
    <div className='analyze-page'>
      <header className='page-header'>
        <h1>
          Create Your Custom{' '}
          <span className='highlight'>Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile
          to build a winning strategy.
        </p>
      </header>

      <div className='interview-card'>
        <div className='interview-card__body'>
          <JobDescriptionPanel
            value={jobDescription}
            onChange={setJobDescription}
          />

          <div className='panel-divider' />

          <ProfilePanel
            resumeFile={resumeFile}
            onResumeChange={setResumeFile}
            selfDescription={selfDescription}
            onSelfDescriptionChange={setSelfDescription}
          />
        </div>

        <div className='interview-card__footer'>
          <span className='footer-info'>
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>

          {(formError || generateError) && (
            <span className='form-error'>
              {formError || generateError}
            </span>
          )}

          <button
            onClick={handleGenerate}
            className='generate-btn'
          >
            <StarIcon />
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      <ReportList
        reports={reports.slice(0, 6)}
        onSelect={(id) => navigate(`/history/${id}`)}
      />
    </div>
  )
}