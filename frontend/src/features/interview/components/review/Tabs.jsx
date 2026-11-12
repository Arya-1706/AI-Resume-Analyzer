const TABS = [
  { id: 'review', label: 'Resume Review' },
  { id: 'questions', label: 'Interview Questions' },
  { id: 'plan', label: 'Preparation Plan' },
]

export default function Tabs({ active, onChange }) {
  return (
    <div className='tabs no-print' role='tablist'>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role='tab'
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}