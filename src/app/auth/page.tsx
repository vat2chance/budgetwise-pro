'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/auth/login-form'
import { SignupForm } from '@/components/auth/signup-form'
import { SubscriptionPlans } from '@/components/subscription/subscription-plans'
import { StripeCheckout } from '@/components/subscription/stripe-checkout'
import { LoginFormData, SignupFormData } from '@/types/auth'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'plans' | 'checkout'>('login')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [_error, setError] = useState<string | null>(null)
  
  const { login, signup } = useAuth()
  const router = useRouter()

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await login(data)
      if (result.success) {
        router.push('/')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await signup(data)
      if (result.success) {
        setMode('plans')
      } else {
        setError(result.error || 'Signup failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
    setMode('checkout')
  }

  const handleCheckoutSuccess = () => {
    router.push('/')
  }

  const handleBackToPlans = () => {
    setMode('plans')
    setSelectedPlan(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className={`w-full ${mode === 'plans' ? 'max-w-7xl' : 'max-w-md'}`}>
        {/* Header - Only show when not displaying plans */}
        {mode !== 'plans' && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              BudgetWise Pro
            </h1>
            <p className="text-lg text-gray-600">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>
        )}

        {/* Error Display */}
        {_error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{_error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {mode === 'login' && (
          <LoginForm 
            onSubmit={handleLogin} 
            loading={loading}
            onSwitchToSignup={() => setMode('signup')}
          />
        )}

        {mode === 'signup' && (
          <SignupForm 
            onSubmit={handleSignup} 
            loading={loading}
            onSwitchToLogin={() => setMode('login')}
          />
        )}

        {mode === 'plans' && (
          <SubscriptionPlans 
            onSelectPlan={handlePlanSelect}
            currentPlan={undefined}
          />
        )}

        {mode === 'checkout' && selectedPlan && (
          <StripeCheckout 
            planId={selectedPlan}
            onSuccess={handleCheckoutSuccess}
            onCancel={handleBackToPlans}
          />
        )}

        {/* Footer - Only show when not displaying plans */}
        {mode !== 'plans' && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
