import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth.context'
import * as authApi from './services/auth.api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    let ignore = false

    authApi
      .getSession()
      .then((data) => {
        if (!ignore) setUser(data.user)
      })
      .catch(() => {
        if (!ignore) setUser(null)
      })
      .finally(() => {
        if (!ignore) setInitializing(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (details) => {
    const data = await authApi.register(details)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({ user, initializing, login, register, logout }),
    [user, initializing, login, register, logout],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}