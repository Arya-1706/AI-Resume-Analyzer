import { TrendingDown, TrendingUp } from 'lucide-react'
import Card from '../../../../shared/components/ui/Card'
import ScoreRing from '../../../../shared/components/ui/ScoreRing'

export default function ScoreCard({ score, previous, className = '' }) {
  const delta = previous == null ? null : score - previous

  return (
    <Card
      title='Overall Match Score'
      hint='How well your profile fits this job overall'
      className={className}
    >
      <div className='score-card__body'>
        <div>
          <p className='score-card__value'>{score}%</p>

          {delta !== null && (
            <span
              className={`delta ${
                delta >= 0 ? 'delta--up' : 'delta--down'
              }`}
            >
              {delta >= 0
                ? <TrendingUp size={14} />
                : <TrendingDown size={14} />}

              {delta >= 0 ? '+' : ''}
              {delta}% vs. last analysis
            </span>
          )}
        </div>

        <ScoreRing value={score} />
      </div>
    </Card>
  )
}