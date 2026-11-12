import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FullPageLoader from '../../../shared/components/FullPageLoader'

export default function GuestRoute() {
  const { user, initializing } = useAuth()
  const location = useLocation()

  if (initializing) return <FullPageLoader />

  if (user) {
    const from = location.state?.from

    return (
      <Navigate
        to={from ? `${from.pathname}${from.search}` : '/analyze'}
        replace
      />
    )
  }

  return <Outlet />
}