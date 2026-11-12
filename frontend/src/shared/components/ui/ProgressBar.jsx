export default function ProgressBar({ value, label }) {
  const safeValue = Math.min(Math.max(value ?? 0, 0), 100)

  return (
    <div
      className='progress'
      role='progressbar'
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <div
        className='progress__fill'
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}