import {
  Briefcase,
  Code,
  GraduationCap,
  Layers,
  Mail,
  Trophy,
} from 'lucide-react'

import Card from '../../../../shared/components/ui/Card'
import ProgressBar from '../../../../shared/components/ui/ProgressBar'

const SECTION_META = {
  contact: { label: 'Contact & Basics', Icon: Mail },
  education: { label: 'Education', Icon: GraduationCap },
  experience: { label: 'Work Experience', Icon: Briefcase },
  projects: { label: 'Projects', Icon: Code },
  skills: { label: 'Skills', Icon: Layers },
  achievements: { label: 'Achievements', Icon: Trophy },
}

export default function SectionAnalysis({ scores, className = '' }) {
  return (
    <Card
      title='Section-wise Analysis'
      hint='How strong each part of your resume is'
      className={className}
    >
      <ul className='section-list'>
        {scores.map(({ section, score }) => {
          const { label, Icon } = SECTION_META[section] ?? {
            label: section,
            Icon: Layers,
          }

          return (
            <li key={section} className='section-row'>
              <span className='section-row__icon'>
                <Icon size={18} />
              </span>

              <span>{label}</span>

              <ProgressBar value={score} label={label} />

              <span className='section-row__value'>{score}%</span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}