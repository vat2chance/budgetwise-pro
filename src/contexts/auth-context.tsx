'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, LoginFormData, SignupFormData, AuthContextType } from '@/types/auth'
import { getSupabaseClient, DEMO_MODE } from '@/lib/supabase'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } | null = null
    
    const initializeAuth = async () => {
      try {
        if (DEMO_MODE) {
          // In demo mode, just set loading to false
          setLoading(false)
          return
        }

        const supabase = getSupabaseClient()
        
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          await loadUserProfile(session.user)
        }
        setLoading(false)

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              await loadUserProfile(session.user)
            } else {
              setUser(null)
            }
            setLoading(false)
          }
        )

        authSubscription = subscription
      } catch (error) {
        console.error('Auth initialization error:', error)
        setLoading(false)
      }
    }

    initializeAuth()
    
    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe()
      }
    }
  }, [])

  const loadUserProfile = async (authUser: { id: string; email?: string; user_metadata?: { name?: string } }) => {
    try {
      if (DEMO_MODE) {
        // In demo mode, create a mock user
        const userData: User = {
          id: authUser.id,
          email: authUser.email || 'demo@example.com',
          name: authUser.user_metadata?.name || 'Demo User',
          subscription: {
            id: 'free',
            status: 'active',
            planId: 'free',
            planName: 'Free Plan',
            currentPeriodStart: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            cancelAtPeriodEnd: false
          }
        }
        setUser(userData)
        return { success: true }
      }

      const supabase = getSupabaseClient()
      
      // Try to get user profile from our users table
      // If the table doesn't exist yet, we'll use default values
      let profileData = null
      try {
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.warn('Profile load failed (table may not exist yet):', profileError)
        } else {
          profileData = profile
        }
      } catch (profileError) {
        console.warn('Profile load failed (table may not exist yet):', profileError)
      }
      
      // Create user object
      const userData: User = {
        id: authUser.id,
        email: authUser.email || 'unknown@example.com',
        name: profileData?.name || authUser.user_metadata?.name || 'User',
        subscription: {
          id: 'free',
          status: 'active',
          planId: 'free',
          planName: 'Free Plan',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false
        }
      }
      
      setUser(userData)
      return { success: true }
    } catch (error) {
      console.error('Profile load error:', error)
      return { success: false, error: 'Failed to load user profile' }
    }
  }

  const login = async (data: LoginFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      
      if (DEMO_MODE) {
        // In demo mode, create a mock user
        const userData: User = {
          id: 'demo-user-id',
          email: data.email,
          name: 'Demo User',
          subscription: {
            id: 'free',
            status: 'active',
            planId: 'free',
            planName: 'Free Plan',
            currentPeriodStart: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            cancelAtPeriodEnd: false
          }
        }
        setUser(userData)
        return { success: true }
      }

      const supabase = getSupabaseClient()
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (authData.user) {
        await loadUserProfile(authData.user)
        return { success: true }
      }

      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (data: SignupFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      
      if (DEMO_MODE) {
        // In demo mode, create a mock user
        const userData: User = {
          id: 'demo-user-id',
          email: data.email,
          name: data.name,
          subscription: {
            id: 'free',
            status: 'active',
            planId: 'free',
            planName: 'Free Plan',
            currentPeriodStart: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            cancelAtPeriodEnd: false
          }
        }
        setUser(userData)
        return { success: true }
      }

      const supabase = getSupabaseClient()
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (authData.user) {
        const userData: User = {
          id: authData.user.id,
          email: data.email,
          name: data.name,
          subscription: {
            id: 'free',
            status: 'active',
            planId: 'free',
            planName: 'Free Plan',
            currentPeriodStart: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            cancelAtPeriodEnd: false
          }
        }
        
        setUser(userData)
        return { success: true }
      }
      
      return { success: false, error: 'Signup failed' }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (!DEMO_MODE) {
        const supabase = getSupabaseClient()
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const updateSubscription = async (planId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      
      if (DEMO_MODE) {
        // In demo mode, just return success
        return { success: true }
      }
      
      const supabase = getSupabaseClient()
      
      // For now, we'll just refresh the user to get updated subscription status
      // In a real app, you might call a specific endpoint to update subscription
      await refreshUser()
      return { success: true }
    } catch (error) {
      console.error('Subscription update error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Subscription update failed' }
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    try {
      if (DEMO_MODE) {
        return
      }
      
      const supabase = getSupabaseClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        await loadUserProfile(authUser)
      }
    } catch (error) {
      console.error('User refresh failed:', error)
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    updateSubscription,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

