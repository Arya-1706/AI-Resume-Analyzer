import api from '../../../lib/axios'

export const register = async ({ username, email, password }) => {
  const response = await api.post('/api/auth/register', {
    username,
    email,
    password,
  })

  return response.data
}

export const login = async ({ email, password }) => {
  const response = await api.post('/api/auth/login', {
    email,
    password,
  })

  return response.data
}

export const logout = async () => {
  const response = await api.get('/api/auth/logout')
  return response.data
}

export const getMe = async () => {
  const response = await api.get('/api/auth/get-me')
  return response.data
}

export const getSession = async () => {
  const response = await api.get('/api/auth/session')
  return response.data
}