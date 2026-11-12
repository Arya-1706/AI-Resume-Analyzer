import { Check, CircleAlert } from 'lucide-react'
import Card from '../../../../shared/components/ui/Card'

export default function KeywordAnalysis({ keywords, className = '' }) {
  return (
    <Card title='Keyword Analysis' className={className}>
      <div className='stat-tiles'>
        <div className='stat-tile stat-tile--found'>
          <span className='stat-tile__icon'>
            <Check size={16} />
          </span>
          <div>
            <strong>{keywords.found.length}</strong>
            <small>Found Keywords</small>
          </div>
        </div>

        <div className='stat-tile stat-tile--missing'>
          <span className='stat-tile__icon'>
            <CircleAlert size={16} />
          </span>
          <div>
            <strong>{keywords.missing.length}</strong>
            <small>Missing Keywords</small>
          </div>
        </div>
      </div>

      {keywords.missing.length > 0 && (
        <>
          <p className='subtitle'>
            Missing Keywords (from the job description)
          </p>
          <ul className='chip-list'>
            {keywords.missing.map((keyword) => (
              <li key={keyword} className='chip chip--missing'>
                {keyword}
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  )
}