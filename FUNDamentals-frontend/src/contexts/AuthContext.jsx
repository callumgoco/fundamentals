import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { authService } from '../services/authService'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const checkingUserRef = useRef(false)

  useEffect(() => {
    // Check if user is logged in on app start
    checkUser()
    
    // Add a fallback timeout to ensure loading doesn't hang forever
    const fallbackTimeout = setTimeout(() => {
      if (loading) {
        console.log('⚠️ Auth check timeout, setting loading to false')
        setLoading(false)
      }
    }, 15000)
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await checkUser()
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
      clearTimeout(fallbackTimeout)
    }
  }, [])

  const checkUser = async () => {
    // Prevent multiple simultaneous calls using ref
    if (checkingUserRef.current) {
      return
    }
    
    try {
      checkingUserRef.current = true
      
      // Check if we already have a valid user in state to avoid redundant checks
      if (user && user.id) {
        setLoading(false)
        return
      }
      
      // Ensure there is a valid session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        console.error('Session check error:', sessionError)
      }
      if (!session) {
        setUser(null)
        setLoading(false)
        return
      }

      // Now get the current user tied to this session
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('User check error:', userError)
        // If token is invalid (e.g., user deleted or env mismatch), sign out to clear it
        const message = userError?.message || ''
        if (message.includes('sub claim') || message.includes('AuthApiError')) {
          try { await supabase.auth.signOut() } catch (_) {}
        }
        setUser(null)
        setLoading(false)
        return
      }
      
      if (currentUser) {
        // Get the user profile
        try {
          const { data: userProfile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single()
          
          if (profileError) {
            console.error('Profile fetch error:', profileError)
            setUser(null)
          } else {
            setUser(userProfile)
          }
        } catch (profileErr) {
          console.error('Profile fetch exception:', profileErr)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setUser(null)
    } finally {
      setLoading(false)
      checkingUserRef.current = false
    }
  }

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await authService.login(usernameOrEmail, password)
      setUser(response.user)
      // Supabase SDK persists session automatically; no manual token storage
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await authService.register(username, email, password)
      
      // Don't automatically log the user in after registration
      // Just return success - they should go to login page
      
      return { success: true, message: 'Registration successful! Please log in.' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await authService.signOut()
      setUser(null)
      localStorage.removeItem('supabase.auth.token')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateUser = async (userData) => {
    try {
      const updatedUser = await authService.updateUser(userData)
      setUser(updatedUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const completeOnboarding = async (onboardingData) => {
    try {
      const updatedUser = await authService.completeOnboarding(onboardingData, user?.id)
      setUser(updatedUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    completeOnboarding,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
