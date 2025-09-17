import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Auth.css'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function CheckEmail() {
  const query = useQuery()
  const navigate = useNavigate()
  const emailFromQuery = query.get('email') || ''

  const [email, setEmail] = useState(emailFromQuery)
  const [message, setMessage] = useState('We just sent a confirmation link to your email.')
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    let timerId
    if (cooldown > 0) {
      timerId = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => timerId && clearTimeout(timerId)
  }, [cooldown])

  const handleResend = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your email to resend the confirmation link.')
      return
    }
    try {
      setResending(true)
      await authService.resendConfirmation(email)
      setMessage('Confirmation email resent. Please check your inbox and spam folder.')
      setCooldown(30)
    } catch (err) {
      setError(err.message || 'Failed to resend confirmation email.')
    } finally {
      setResending(false)
    }
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Verify your email</h1>
          <p>{message}</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form className="auth-form" onSubmit={handleResend}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={resending || cooldown > 0}
          >
            {resending ? 'Resending...' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend confirmation email'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already confirmed?{' '}
            <button onClick={goToLogin} className="auth-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              Sign in here
            </button>
          </p>
          <p>If you don't see the email, check your spam folder.</p>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail

import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Auth.css'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function CheckEmail() {
  const query = useQuery()
  const navigate = useNavigate()
  const emailFromQuery = query.get('email') || ''

  const [email, setEmail] = useState(emailFromQuery)
  const [message, setMessage] = useState('We just sent a confirmation link to your email.')
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    let timerId
    if (cooldown > 0) {
      timerId = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => timerId && clearTimeout(timerId)
  }, [cooldown])

  const handleResend = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your email to resend the confirmation link.')
      return
    }
    try {
      setResending(true)
      await authService.resendConfirmation(email)
      setMessage('Confirmation email resent. Please check your inbox and spam folder.')
      setCooldown(30)
    } catch (err) {
      setError(err.message || 'Failed to resend confirmation email.')
    } finally {
      setResending(false)
    }
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Verify your email</h1>
          <p>{message}</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form className="auth-form" onSubmit={handleResend}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={resending || cooldown > 0}
          >
            {resending ? 'Resending...' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend confirmation email'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already confirmed?{' '}
            <button onClick={goToLogin} className="auth-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              Sign in here
            </button>
          </p>
          <p>If you don't see the email, check your spam folder.</p>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail


