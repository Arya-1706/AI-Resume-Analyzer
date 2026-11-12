function Cube({ x, y, size, opacity = 1 }) {
  const w = size * 0.87
  const h = size / 2

  return (
    <g opacity={opacity}>
      <polygon
        points={`${x},${y - size} ${x + w},${y - h} ${x},${y} ${x - w},${y - h}`}
        fill='currentColor'
        fillOpacity='0.55'
      />
      <polygon
        points={`${x - w},${y - h} ${x},${y} ${x},${y + size} ${x - w},${y + h}`}
        fill='currentColor'
        fillOpacity='0.28'
      />
      <polygon
        points={`${x + w},${y - h} ${x},${y} ${x},${y + size} ${x + w},${y + h}`}
        fill='currentColor'
        fillOpacity='0.14'
      />
    </g>
  )
}

export default function HeroBanner() {
  return (
    <section className='hero'>
      <div>
        <h1>Resume Review</h1>
        <p>
          AI-powered analysis of your resume against the target job description.
        </p>
      </div>

      <svg
        className='hero__art'
        viewBox='0 0 240 160'
        aria-hidden='true'
      >
        <Cube x={150} y={70} size={40} />
        <Cube x={95} y={108} size={26} opacity={0.8} />
        <Cube x={198} y={112} size={22} opacity={0.7} />
      </svg>
    </section>
  )
}