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
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Take control of your finances</h1>
        <p className="text-xl text-gray-600 mb-8">Choose the perfect plan for your budgeting needs</p>
        
        {/* Toggle */}
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
              className={`relative rounded-xl border-2 p-6 shadow-sm hover:shadow-md transition-shadow min-h-[500px] flex flex-col ${
                isPopular
                  ? 'border-blue-500 bg-blue-50 shadow-blue-100'
                  : isCurrentPlan
                  ? 'border-green-500 bg-green-50 shadow-green-100'
                  : 'border-gray-200 bg-white hover:border-gray-300'
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-sm text-gray-500">/{plan.interval}</span>
                  )}
                </div>
                {plan.price > 0 && isYearly && (
                  <p className="text-xs text-green-600 font-medium px-1">
                    Save ${((plan.price / 12) * 2).toFixed(2)} per month
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                disabled={loading || isCurrentPlan}
                className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isCurrentPlan
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isCurrentPlan
                  ? 'Current Plan'
                  : plan.price === 0
                  ? 'Get Started'
                  : 'Subscribe Now'}
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
      <div className="text-center mt-12">
        <p className="text-lg text-gray-600 mb-4">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
        <p className="text-sm text-gray-500">
          Need a custom plan?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  )
}
