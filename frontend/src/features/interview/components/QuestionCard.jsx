import { useState } from 'react'
import { ChevronDownIcon } from './icons'

export default function QuestionCard({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className='q-card'>
      <div
        className='q-card__header'
        onClick={() => setOpen((value) => !value)}
      >
        <span className='q-card__index'>Q{index + 1}</span>

        <p className='q-card__question'>{item.question}</p>

        <span
          className={`q-card__chevron ${
            open ? 'q-card__chevron--open' : ''
          }`}
        >
          <ChevronDownIcon />
        </span>
      </div>

      {open && (
        <div className='q-card__body'>
          <div className='q-card__section'>
            <span className='q-card__tag q-card__tag--intention'>
              Intention
            </span>

            <p>{item.intention}</p>
          </div>

          <div className='q-card__section'>
            <span className='q-card__tag q-card__tag--answer'>
              Model Answer
            </span>

            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}