import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FilePlus, History, LogOut, Sparkles } from 'lucide-react'
import { useAuth } from '../features/auth/hooks/useAuth'

const NAV_ITEMS = [
  { to: '/analyze', label: 'Analyze', Icon: FilePlus },
  { to: '/history', label: 'History', Icon: History },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const initial = user?.username?.[0]?.toUpperCase() ?? '?'

  const handleLogout = async () => {
    navigate('/', { replace: true })
    await logout()
  }

  return (
    <aside className='sidebar'>
      <Link to='/' className='sidebar__brand'>
        <Sparkles size={26} className='sidebar__logo' />
        <span>AI Resume Analyzer</span>
      </Link>

      <nav className='sidebar__nav'>
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className='sidebar__user'>
        <span className='sidebar__avatar'>{initial}</span>

        <div className='sidebar__user-info'>
          <strong>{user?.username}</strong>
          <small>{user?.email}</small>
        </div>

        <button
          className='icon-button'
          onClick={handleLogout}
          aria-label='Log out'
          title='Log out'
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}