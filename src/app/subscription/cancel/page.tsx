'use client'

import { useRouter } from 'next/navigation'
import { XMarkIcon, ArrowLeftIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function PaymentCancelPage() {
  const router = useRouter()

  const handleGoBack = () => {
    router.push('/auth')
  }

  const handleTryAgain = () => {
    router.push('/auth') // This will take them back to the subscription selection
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Cancel Icon */}
        <div className="mb-6">
          <XMarkIcon className="w-16 h-16 text-gray-400 mx-auto" />
        </div>

        {/* Cancel Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment was cancelled and no charges were made to your account. You can try again anytime or continue with the free plan.
        </p>

        {/* Free Plan Features */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Continue with Free Plan:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Basic budget tracking</li>
            <li>• Up to 3 budget categories</li>
            <li>• Simple reports</li>
            <li>• Mobile responsive design</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <CreditCardIcon className="w-4 h-4 mr-2" />
            Try Payment Again
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Continue with Free Plan
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@budgetwise.com" className="text-blue-600 hover:text-blue-500">
              support@budgetwise.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
