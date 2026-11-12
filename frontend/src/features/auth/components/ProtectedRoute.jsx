import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FullPageLoader from '../../../shared/components/FullPageLoader'

export default function ProtectedRoute() {
  const { user, initializing } = useAuth()
  const location = useLocation()

  if (initializing) return <FullPageLoader />

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
      state={{ from: location }}
    />
  )
}