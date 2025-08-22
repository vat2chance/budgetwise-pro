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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Take control of your finances</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">Choose the perfect plan for your budgeting needs</p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-4">
          <span className={`text-sm ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors touch-manipulation ${
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id
          const isPopular = plan.popular
          
          return (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow min-h-[450px] sm:min-h-[500px] flex flex-col ${
                isPopular
                  ? 'border-blue-500 bg-blue-50 shadow-blue-100'
                  : isCurrentPlan
                  ? 'border-green-500 bg-green-50 shadow-green-100'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-600 text-white">
                    <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-600 text-white">
                    Current Plan
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-xs sm:text-sm text-gray-500">/{plan.interval}</span>
                  )}
                </div>
                {plan.price > 0 && isYearly && (
                  <div className="text-xs sm:text-sm text-green-600 font-medium">
                    Save {formatCurrency((plan.price * 12) - (plan.price * 10))} per year
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="flex-grow space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={loading || isCurrentPlan}
                  className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors touch-manipulation ${
                    isCurrentPlan
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {loading ? 'Loading...' : isCurrentPlan ? 'Current Plan' : 'Get Started'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
