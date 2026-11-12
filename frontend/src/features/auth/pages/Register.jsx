import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export default function Register() {
  const { register } = useAuth()
  const location = useLocation()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
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
      await register(form)
    } catch (err) {
      setError(getErrorMessage(err))
      setSubmitting(false)
    }
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <p className='form-error' role='alert'>
              {error}
            </p>
          )}

          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              value={form.username}
              onChange={handleChange}
              placeholder='Enter username'
              autoComplete='username'
              required
            />
          </div>

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
              autoComplete='new-password'
              required
            />
          </div>

          <button
            className='button primary-button'
            type='submit'
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to='/login' state={location.state}>
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}