import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const navigate = useNavigate()

  return (
    <header className='topbar'>
      <button
        className='topbar__search'
        onClick={() => navigate('/analyze')}
      >
        <Search size={18} />
        Analyze a new resume or job description...
      </button>
    </header>
  )
}