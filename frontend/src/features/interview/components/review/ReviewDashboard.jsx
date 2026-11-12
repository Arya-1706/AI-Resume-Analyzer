import Card from '../../../../shared/components/ui/Card'
import ResumePreview from './ResumePreview'
import ScoreCard from './ScoreCard'
import JdMatchCard from './JdMatchCard'
import SectionAnalysis from './SectionAnalysis'
import KeywordAnalysis from './KeywordAnalysis'
import InsightsCard from './InsightsCard'
import SuggestionsCard from './SuggestionsCard'

export default function ReviewDashboard({ report }) {
  const { analysis } = report

  // Handle older reports that don't have detailed analysis
  if (!analysis?.sectionScores?.length) {
    return (
      <div className='stack'>
        <ScoreCard
          score={report.matchScore}
          previous={report.previousMatchScore}
        />

        <Card>
          <p className='muted'>
            This report was created before the detailed analysis existed.
            Run a new analysis from the Analyze page to see section scores,
            keywords and suggestions.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className='dashboard'>
      <ResumePreview
        className='dashboard__preview'
        text={report.resume || report.selfDescription}
        source={
          report.resume
            ? 'Text extracted from your uploaded PDF'
            : 'Your self description'
        }
      />

      <ScoreCard
        className='dashboard__score'
        score={report.matchScore}
        previous={report.previousMatchScore}
      />

      <JdMatchCard
        className='dashboard__jd'
        matched={analysis.jdMatch.matched}
        total={analysis.jdMatch.total}
      />

      <SectionAnalysis
        className='dashboard__sections'
        scores={analysis.sectionScores}
      />

      <KeywordAnalysis
        className='dashboard__keywords'
        keywords={analysis.keywords}
      />

      <InsightsCard
        className='dashboard__insights'
        insights={analysis.insights}
      />

      <SuggestionsCard
        className='dashboard__suggestions'
        suggestions={analysis.suggestions}
      />
    </div>
  )
}