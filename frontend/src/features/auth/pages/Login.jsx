import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export default function Login() {
  const { login } = useAuth()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form)
    } catch (err) {
      setError(getErrorMessage(err))
      setSubmitting(false)
    }
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <p className='form-error' role='alert'>
              {error}
            </p>
          )}

          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Enter email address'
              autoComplete='email'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
              placeholder='Enter password'
              autoComplete='current-password'
              required
            />
          </div>

          <button
            className='button primary-button'
            type='submit'
            disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p>
          Don't have an account?{' '}
          <Link to='/register' state={location.state}>
            Register
          </Link>
        </p>
      </div>
    </main>
  )
}