import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ children, requireOnboarding = true }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Only check onboarding completion if required
  if (requireOnboarding && !user.onboarding_completed) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

export default PrivateRoute
