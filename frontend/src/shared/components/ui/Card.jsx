import { Info } from 'lucide-react'

export default function Card({
  title,
  hint,
  className = '',
  children,
}) {
  return (
    <section className={`card ${className}`}>
      {title && (
        <h2 className='card__title'>
          {title}
          {hint && (
            <span className='card__hint' title={hint}>
              <Info size={14} />
            </span>
          )}
        </h2>
      )}
      {children}
    </section>
  )
}