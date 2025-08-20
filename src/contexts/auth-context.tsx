'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, SubscriptionPlan, LoginFormData, SignupFormData, AuthContextType } from '@/types/auth'
import { apiService } from '@/services/api'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // Verify token with backend
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const userData = await apiService.verifyToken()
      setUser(userData.user)
      // Update token if refreshed
      if (userData.token) {
        localStorage.setItem('authToken', userData.token)
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('authToken')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: LoginFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      const result = await apiService.login(data.email, data.password)
      
      const { user: userData, token } = result
      setUser(userData)
      localStorage.setItem('authToken', token)
      return { success: true }
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
      const result = await apiService.register(data.name, data.email, data.password)
      
      const { user: userData, token } = result
      setUser(userData)
      localStorage.setItem('authToken', token)
      return { success: true }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('authToken')
    }
  }

  const updateSubscription = async (planId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        return { success: false, error: 'Not authenticated' }
      }

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
    const token = localStorage.getItem('authToken')
    if (token) {
      await verifyToken(token)
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

