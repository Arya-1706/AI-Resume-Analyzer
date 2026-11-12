import { BriefcaseIcon } from './icons'
import { MAX_JOB_DESCRIPTION_CHARS } from '../interview.constants'

export default function JobDescriptionPanel({ value, onChange }) {
  return (
    <div className='panel panel--left'>
      <div className='panel__header'>
        <span className='panel__icon'>
          <BriefcaseIcon size={18} />
        </span>

        <h2 id='jobDescriptionLabel'>Target Job Description</h2>

        <span className='badge badge--required'>Required</span>
      </div>

      <textarea
        id='jobDescription'
        name='jobDescription'
        aria-labelledby='jobDescriptionLabel'
        className='panel__textarea'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Paste the full job description here. For example: Senior Frontend Engineer, React, TypeScript, system design...'
        maxLength={MAX_JOB_DESCRIPTION_CHARS}
      />

      <div className='char-counter'>
        {value.length} / {MAX_JOB_DESCRIPTION_CHARS} chars
      </div>
    </div>
  )
}