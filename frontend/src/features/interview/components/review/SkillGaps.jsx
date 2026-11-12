import Card from '../../../../shared/components/ui/Card'

export default function SkillGaps({ gaps }) {
  if (!gaps?.length) return null

  return (
    <Card title='Skill Gaps'>
      <ul className='chip-list'>
        {gaps.map((gap, index) => (
          <li
            key={index}
            className={`skill-tag skill-tag--${gap.severity}`}
          >
            {gap.skill}
          </li>
        ))}
      </ul>
    </Card>
  )
}