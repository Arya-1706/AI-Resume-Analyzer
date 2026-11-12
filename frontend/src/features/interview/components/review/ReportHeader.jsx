import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRightLeft,
  Briefcase,
  Download,
  FileText,
  Sparkles,
} from 'lucide-react'
import { formatFileSize } from '../../interview.utils'

// readOnly is used by the public sample page.
export default function ReportHeader({
  report,
  onDownload,
  downloading,
  error,
  readOnly = false,
}) {
  const hasFile = Boolean(report.resumeFile?.name)

  return (
    <div className='report-header'>
      <Link
        to={readOnly ? '/' : '/history'}
        className='report-header__back no-print'
      >
        <ArrowLeft size={18} />
        {readOnly ? 'Back to Home' : 'Back to History'}
      </Link>

      <div className='report-header__chip'>
        <span className='chip-icon'>
          <FileText size={20} />
        </span>
        <div>
          <strong>
            {hasFile ? report.resumeFile.name : 'Self description'}
          </strong>
          <small>
            {hasFile
              ? formatFileSize(report.resumeFile.size)
              : 'No resume uploaded'}
          </small>
        </div>
      </div>

      <div className='report-header__chip'>
        <span className='chip-icon'>
          <Briefcase size={20} />
        </span>
        <div>
          <small>Target Role</small>
          <strong>{report.title || 'Untitled Position'}</strong>
        </div>
      </div>

      <div className='report-header__actions no-print'>
        {readOnly ? (
          <Link to='/analyze' className='button primary-button'>
            <Sparkles size={16} />
            Analyze my resume
          </Link>
        ) : (
          <>
            <Link to='/analyze' className='button ghost-button'>
              <ArrowRightLeft size={16} />
              Replace Files
            </Link>

            <button
              className='button ghost-button'
              onClick={() => window.print()}
            >
              <Download size={16} />
              Export Report
            </button>

            <button
              className='button primary-button'
              onClick={onDownload}
              disabled={downloading}
            >
              <Sparkles size={16} />
              {downloading ? 'Preparing PDF...' : 'Tailored Resume'}
            </button>
          </>
        )}
      </div>

      {error && (
        <p className='form-error report-header__error'>{error}</p>
      )}
    </div>
  )
}