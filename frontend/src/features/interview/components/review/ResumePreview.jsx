import { useState } from 'react'
import { Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react'
import Card from '../../../../shared/components/ui/Card'

const ZOOM_STEPS = [80, 90, 100, 110, 125, 150]

export default function ResumePreview({ text, source, className = '' }) {
  const [zoom, setZoom] = useState(100)
  const [expanded, setExpanded] = useState(false)

  const changeZoom = (direction) => {
    const index = ZOOM_STEPS.indexOf(zoom) + direction
    setZoom(
      ZOOM_STEPS[
        Math.min(Math.max(index, 0), ZOOM_STEPS.length - 1)
      ],
    )
  }

  return (
    <Card
      title='Resume Preview'
      className={`resume-preview ${
        expanded ? 'resume-preview--expanded' : ''
      } ${className}`}
    >
      <p className='resume-preview__source muted'>{source}</p>

      <div className='resume-preview__paper'>
        {text ? (
          <pre
            className='resume-preview__text'
            style={{ fontSize: `${(zoom / 100) * 0.82}rem` }}
          >
            {text}
          </pre>
        ) : (
          <p>No resume text available.</p>
        )}
      </div>

      <div className='resume-preview__toolbar no-print'>
        <button
          className='icon-button'
          onClick={() => changeZoom(-1)}
          aria-label='Zoom out'
        >
          <ZoomOut size={16} />
        </button>

        <span>{zoom}%</span>

        <button
          className='icon-button'
          onClick={() => changeZoom(1)}
          aria-label='Zoom in'
        >
          <ZoomIn size={16} />
        </button>

        <button
          className='icon-button'
          onClick={() => setExpanded((value) => !value)}
          aria-label={expanded ? 'Collapse preview' : 'Expand preview'}
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </Card>
  )
}