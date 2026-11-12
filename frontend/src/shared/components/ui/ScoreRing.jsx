export default function ScoreRing({ value, size = 96, stroke = 9 }) {
  const safeValue = Math.min(Math.max(value ?? 0, 0), 100)
  const center = size / 2
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - safeValue / 100)

  return (
    <div className='score-ring' style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden='true'
      >
        <defs>
          <linearGradient
            id='score-ring-gradient'
            x1='0'
            y1='0'
            x2='1'
            y2='1'
          >
            <stop
              offset='0%'
              style={{ stopColor: 'var(--accent-strong)' }}
            />
            <stop
              offset='100%'
              style={{ stopColor: 'var(--accent-light)' }}
            />
          </linearGradient>
        </defs>

        <circle
          className='score-ring__track'
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill='none'
        />

        <circle
          className='score-ring__value'
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill='none'
          stroke='url(#score-ring-gradient)'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <span className='score-ring__label'>{safeValue}%</span>
    </div>
  )
}