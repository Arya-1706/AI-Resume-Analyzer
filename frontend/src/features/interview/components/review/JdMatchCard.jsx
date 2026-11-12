import Card from '../../../../shared/components/ui/Card'
import ProgressBar from '../../../../shared/components/ui/ProgressBar'

export default function JdMatchCard({ matched, total, className = '' }) {
  const percent = total ? Math.round((matched / total) * 100) : 0

  return (
    <Card
      title='Job Description Match'
      hint='Share of key job requirements you meet'
      className={className}
    >
      <div className='jd-match'>
        <ProgressBar value={percent} label='Job description match' />
        <span>{percent}%</span>
      </div>

      <p className='muted jd-match__caption'>
        Matched {matched} of {total} key requirements
      </p>
    </Card>
  )
}