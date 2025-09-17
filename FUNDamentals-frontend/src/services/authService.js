import { supabase, authHelpers } from '../lib/supabase'

export const authService = {
  async login(usernameOrEmail, password) {
    try {
      // Determine email from username if needed
      let emailToUse = usernameOrEmail
      if (!usernameOrEmail.includes('@')) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('email')
            .eq('username', usernameOrEmail)
            .maybeSingle()

          if (profileError) {
            console.error('Profile lookup error:', profileError)
            throw new Error('Failed to lookup user profile')
          }

          if (!profileData?.email) {
            throw new Error('Username not found. Try signing in with your email.')
          }

          emailToUse = profileData.email
        } catch (profileErr) {
          console.error('Profile lookup exception:', profileErr)
          throw profileErr
        }
      }

      const { data, error } = await authHelpers.signIn(emailToUse, password)
      if (error) {
        console.error('Sign in error:', error)
        throw new Error(error.message)
      }

      // Ensure a user profile exists; create one if missing
      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle()

      if (userError) {
        console.error('User profile fetch error:', userError)
        throw new Error('Failed to get user profile')
      }

      let ensuredProfile = userProfile

      if (!ensuredProfile) {
        // Attempt to create a minimal profile for this user
        const usernameFromInput = usernameOrEmail.includes('@') ? null : usernameOrEmail
        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            username: usernameFromInput || data.user.user_metadata?.username || null,
            onboarding_completed: false
          })
          .select()
          .single()

        if (createError) {
          console.error('User profile create error:', createError)
          // Do not block sign-in; return minimal details and let app handle onboarding later
          ensuredProfile = {
            id: data.user.id,
            email: data.user.email,
            username: usernameFromInput || data.user.user_metadata?.username || null,
            onboarding_completed: false
          }
        } else {
          ensuredProfile = createdProfile
        }
      }

      return {
        token: data.session.access_token,
        user: ensuredProfile
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

      // Do not require immediate profile creation; email confirmation may be pending
      return { success: true }
    } catch (error) {
      console.error('Registration service error:', error)
      throw error
    }
  },

  async resendConfirmation(email) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Resend confirmation error:', error)
      throw new Error(error.message || 'Failed to resend confirmation email')
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
