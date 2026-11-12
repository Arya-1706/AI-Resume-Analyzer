import { getScoreMeta } from '../interview.utils'


export default function ReportList({
  reports,
  onSelect,
  title = 'Recent Analyses',
}) {
  if (reports.length === 0) return null

  return (
    <section className='recent-reports'>
      {title && <h2>{title}</h2>}

      <div className='reports-list'>
        {reports.map((report) => (
          <article
            key={report._id}
            className='report-item'
            onClick={() => onSelect(report._id)}
          >
            <h3>{report.targetRole || 'Resume Analysis'}</h3>

            <p className='report-meta'>
              {report.company || 'General Analysis'}
            </p>

            <span className='match-score'>
              Match Score: {report.matchScore ?? 0}%
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
