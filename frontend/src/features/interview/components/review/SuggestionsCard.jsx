import { Code, FileText, Lightbulb, TrendingUp } from 'lucide-react'
import Card from '../../../../shared/components/ui/Card'

const SUGGESTION_ICONS = {
  keywords: Code,
  impact: TrendingUp,
  content: FileText,
  format: Lightbulb,
}

export default function SuggestionsCard({ suggestions, className = '' }) {
  return (
    <Card title='Improvement Suggestions' className={className}>
      <div className='suggestion-grid'>
        {suggestions.map((suggestion, index) => {
          const Icon = SUGGESTION_ICONS[suggestion.type] ?? Lightbulb

          return (
            <article key={index} className='suggestion'>
              <Icon size={22} className='suggestion__icon' />
              <h3>{suggestion.title}</h3>
              <p>{suggestion.description}</p>
            </article>
          )
        })}
      </div>
    </Card>
  )
}