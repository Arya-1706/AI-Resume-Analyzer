import { Link, Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useAuth } from '../auth/hooks/useAuth'
import './public.scss'

export default function PublicLayout() {
  const { user, initializing } = useAuth()

  return (
    <div className='public'>
      <header className='public__header'>
        <Link to='/' className='public__brand'>
          <Sparkles size={22} />
          AI Resume Analyzer
        </Link>

        <nav className='public__nav'>
          <Link to='/sample'>Sample report</Link>

          {!initializing &&
            (user ? (
              <Link to='/analyze' className='button primary-button'>
                Open app
              </Link>
            ) : (
              <>
                <Link to='/login' className='button ghost-button'>
                  Log in
                </Link>

                <Link to='/register' className='button primary-button'>
                  Sign up
                </Link>
              </>
            ))}
        </nav>
      </header>

      <Outlet />

      <footer className='public__footer'>
        Scores are AI-generated estimates, not an official ATS result.
      </footer>
    </div>
  )
}