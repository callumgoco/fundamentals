import { supabase, authHelpers } from '../lib/supabase'

export const authService = {
  async login(username, password) {
    try {
      let profile = null
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('email')
          .eq('username', username)
          .single()

        if (profileError || !profileData) {
          console.error('Profile lookup error:', profileError)
          throw new Error('User not found')
        }

        profile = profileData
      } catch (profileErr) {
        console.error('Profile lookup exception:', profileErr)
        throw new Error('Failed to lookup user profile')
      }

      const { data, error } = await authHelpers.signIn(profile.email, password)
      if (error) {
        console.error('Sign in error:', error)
        throw new Error(error.message)
      }

      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (userError) {
        console.error('User profile fetch error:', userError)
        throw new Error('Failed to get user profile')
      }

      return {
        token: data.session.access_token,
        user: userProfile
      }
    } catch (error) {
      console.error('Login service error:', error)
      throw error
    }
  },

  async register(username, email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      })

      if (error) {
        console.error('Registration error:', error)
        throw new Error(error.message)
      }

      await new Promise(resolve => setTimeout(resolve, 3000))

      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (userError || !userProfile) {
        throw new Error('User profile not created. Ensure DB trigger exists or create via a secure server function.')
      }

      return {
        token: data.session?.access_token,
        user: userProfile
      }
    } catch (error) {
      console.error('Registration service error:', error)
      throw error
    }
  },

  async validateToken(token) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        console.error('Token validation error:', error)
        throw new Error('Invalid token')
      }

      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userError) {
        console.error('User profile fetch error during validation:', userError)
        throw new Error('Failed to get user profile')
      }

      return userProfile
    } catch (error) {
      console.error('Token validation service error:', error)
      throw error
    }
  },

  async updateUser(userData) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        console.error('Auth error during update:', authError)
        throw new Error('Not authenticated')
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Profile update error:', error)
        throw new Error(error.message)
      }

      return data
    } catch (error) {
      console.error('User update service error:', error)
      throw error
    }
  },

  async completeOnboarding(onboardingData) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        console.error('Auth error during onboarding:', authError)
        throw new Error('Not authenticated')
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          goal: onboardingData.goal,
          confidence: onboardingData.confidence,
          learning_style: onboardingData.learn,
          onboarding_completed: true
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Onboarding update error:', error)
        throw new Error(error.message)
      }

      return data
    } catch (error) {
      console.error('Onboarding service error:', error)
      throw error
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        return null
      }

      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userError) {
        return null
      }

      return userProfile
    } catch (error) {
      return null
    }
  },

  async signOut() {
    try {
      const { error } = await authHelpers.signOut()
      if (error) {
        throw error
      }
      return { success: true }
    } catch (error) {
      throw error
    }
  }
}

export default supabase
