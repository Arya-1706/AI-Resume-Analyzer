import { CircleAlert, CircleCheck, Info } from 'lucide-react'
import Card from '../../../../shared/components/ui/Card'

const INSIGHT_ICONS = {
  strength: CircleCheck,
  gap: CircleAlert,
  tip: Info,
}

export default function InsightsCard({ insights, className = '' }) {
  return (
    <Card title='JD Match Insights' className={className}>
      <ul className='insight-list'>
        {insights.map((insight, index) => {
          const Icon = INSIGHT_ICONS[insight.type] ?? Info

          return (
            <li
              key={index}
              className={`insight insight--${insight.type}`}
            >
              <Icon size={18} />
              <span>{insight.text}</span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}