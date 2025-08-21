'use client'

import { useState, useEffect } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getPlanById } from '@/config/subscription-plans'
import { formatCurrency } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { apiService } from '@/services/api'

interface StripeCheckoutProps {
  planId: string
  onSuccess: () => void
  onCancel: () => void
  loading?: boolean
}

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo')

export function StripeCheckout({ planId, onSuccess, onCancel, loading = false }: StripeCheckoutProps) {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const plan = getPlanById(planId)

  useEffect(() => {
    stripePromise.then(setStripe)
  }, [])

  const handleCheckout = async () => {
    if (!plan || !user) return

    try {
      setCheckoutLoading(true)
      setError(null)

      // Create checkout session with backend
      const result = await apiService.createCheckoutSession({
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price,
        planInterval: plan.interval
      })

      if (result.id) {
        // Check if this is demo mode
        if (result.demoMode || result.id.startsWith('cs_demo_')) {
          // Demo mode - simulate successful checkout
          alert(`Demo Mode: Checkout session created!\n\nSession ID: ${result.id}\n\nIn production, you would be redirected to Stripe Checkout.`)
          
          // Simulate success after a delay
          setTimeout(() => {
            onSuccess()
          }, 1000)
        } else {
          // Real Stripe checkout
          if (stripe) {
            const { error: stripeError } = await stripe.redirectToCheckout({
              sessionId: result.id
            })

            if (stripeError) {
              setError(stripeError.message || 'Checkout failed')
            }
          }
        }
      } else {
        setError('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setError(error instanceof Error ? error.message : 'Network error. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleCustomerPortal = async () => {
    try {
      setCheckoutLoading(true)
      setError(null)

      // Create customer portal session with backend
      const result = await apiService.createPortalSession()

      if (result.url) {
        // Redirect to Stripe Customer Portal
        window.location.href = result.url
      } else {
        setError('Failed to access customer portal')
      }
    } catch (error) {
      console.error('Portal access error:', error)
      setError(error instanceof Error ? error.message : 'Network error. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (!plan) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-600">
          <XMarkIcon className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Plan Not Found</h3>
          <p className="text-gray-600">The selected plan could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <CheckIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Your Order</h3>
        <p className="text-gray-600">You&apos;re about to subscribe to the {plan.name} plan</p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{plan.name} Plan</span>
            <span className="font-medium">{formatCurrency(plan.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Billing Cycle</span>
            <span className="font-medium capitalize">{plan.interval}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold text-lg">{formatCurrency(plan.price)}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">What&apos;s Included:</h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex">
            <XMarkIcon className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading || loading || !stripe}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {checkoutLoading ? 'Processing...' : `Subscribe to ${plan.name}`}
        </button>
        
        {user?.subscription?.status === 'active' && (
          <button
            onClick={handleCustomerPortal}
            disabled={checkoutLoading}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Manage Subscription
          </button>
        )}
        
        <button
          onClick={onCancel}
          disabled={checkoutLoading}
          className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Your payment is secured by Stripe. We never store your payment information.
        </p>
      </div>
    </div>
  )
}
