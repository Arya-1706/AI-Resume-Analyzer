import { useState } from 'react'
import '../../styles/report.scss'

import HeroBanner from './HeroBanner'
import ReportHeader from './ReportHeader'
import Tabs from './Tabs'
import ReviewDashboard from './ReviewDashboard'
import SkillGaps from './SkillGaps'

import QuestionSection from '../QuestionSection'
import RoadMap from '../RoadMap'

export default function ReportView({
  report,
  readOnly = false,
  onDownload,
  downloading,
  error,
}) {
  const [tab, setTab] = useState('review')

  return (
    <div className='report'>
      <HeroBanner />

      <ReportHeader
        report={report}
        readOnly={readOnly}
        onDownload={onDownload}
        downloading={downloading}
        error={error}
      />

      <Tabs active={tab} onChange={setTab} />

      {tab === 'review' && (
        <ReviewDashboard report={report} />
      )}

      {tab === 'questions' && (
        <div className='stack'>
          <QuestionSection
            title='Technical Questions'
            questions={report.technicalQuestions}
          />

          <QuestionSection
            title='Behavioral Questions'
            questions={report.behavioralQuestions}
          />
        </div>
      )}

      {tab === 'plan' && (
        <div className='stack'>
          <RoadMap plan={report.preparationPlan} />
          <SkillGaps gaps={report.skillGaps} />
        </div>
      )}
    </div>
  )
}