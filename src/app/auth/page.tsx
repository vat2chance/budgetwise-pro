'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { LoginForm } from '@/components/auth/login-form'
import { SignupForm } from '@/components/auth/signup-form'
import { SubscriptionPlans } from '@/components/subscription/subscription-plans'
import { StripeCheckout } from '@/components/subscription/stripe-checkout'
import { LoginFormData, SignupFormData } from '@/types/auth'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'plans' | 'checkout'>('login')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
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
    } catch (error) {
      setError('An unexpected error occurred')
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
        router.push('/')
      } else {
        setError(result.error || 'Signup failed')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setMode('checkout')
  }

  const handleCheckoutSuccess = () => {
    // Redirect to dashboard after successful subscription
    router.push('/')
  }

  const handleCheckoutCancel = () => {
    setMode('plans')
    setSelectedPlan(null)
  }

  const switchToSignup = () => {
    setMode('signup')
    setError(null)
  }

  const switchToLogin = () => {
    setMode('login')
    setError(null)
  }

  const switchToPlans = () => {
    setMode('plans')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BudgetWise Pro</h1>
          <p className="text-gray-600">Take control of your finances</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {mode === 'login' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <LoginForm onSubmit={handleLogin} onSwitchToSignup={switchToSignup} loading={loading} />
            <div className="mt-4 text-center">
              <button
                onClick={switchToPlans}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View subscription plans
              </button>
            </div>
          </div>
        )}

        {mode === 'signup' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SignupForm onSubmit={handleSignup} onSwitchToLogin={switchToLogin} loading={loading} />
            <div className="mt-4 text-center">
              <button
                onClick={switchToPlans}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View subscription plans
              </button>
            </div>
          </div>
        )}

        {mode === 'plans' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SubscriptionPlans onSelectPlan={handlePlanSelect} />
            <div className="mt-6 text-center">
              <button
                onClick={switchToLogin}
                className="text-sm text-gray-600 hover:text-gray-500"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        )}

        {mode === 'checkout' && selectedPlan && (
          <StripeCheckout
            planId={selectedPlan}
            onSuccess={handleCheckoutSuccess}
            onCancel={handleCheckoutCancel}
            loading={loading}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
