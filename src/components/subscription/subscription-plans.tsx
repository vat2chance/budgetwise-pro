'use client'

import { useState } from 'react'
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid'
import { subscriptionPlans, yearlyPlans } from '@/config/subscription-plans'
import { formatCurrency } from '@/lib/utils'

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void
  currentPlan?: string
  loading?: boolean
}

export function SubscriptionPlans({ onSelectPlan, currentPlan, loading = false }: SubscriptionPlansProps) {
  const [isYearly, setIsYearly] = useState(false)
  const plans = isYearly ? yearlyPlans : subscriptionPlans

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Toggle */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
            {isYearly && (
              <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Save 20%
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id
          const isPopular = plan.popular
          
          return (
            <div
              key={plan.id}
              className={`relative rounded-lg border-2 p-6 ${
                isPopular
                  ? 'border-blue-500 bg-blue-50'
                  : isCurrentPlan
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                    Current Plan
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">/{plan.interval}</span>
                  )}
                </div>
                {plan.price > 0 && isYearly && (
                  <p className="text-sm text-green-600 font-medium">
                    Save ${((plan.price / 12) * 2).toFixed(2)} per month
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                disabled={loading || isCurrentPlan}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isCurrentPlan
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isCurrentPlan
                  ? 'Current Plan'
                  : plan.price === 0
                  ? 'Get Started'
                  : `Subscribe Now`}
              </button>

              {/* Free Plan Note */}
              {plan.price === 0 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  No credit card required
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Need a custom plan?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  )
}
