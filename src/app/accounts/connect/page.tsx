'use client'

import { useState } from 'react'
import { 
  BanknotesIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/auth/protected-route'

const supportedBanks = [
  { name: 'Chase Bank', logo: '🏦', popular: true },
  { name: 'Bank of America', logo: '🏛️', popular: true },
  { name: 'Wells Fargo', logo: '🏦', popular: true },
  { name: 'Citibank', logo: '🏛️', popular: false },
  { name: 'Capital One', logo: '🏦', popular: false },
  { name: 'American Express', logo: '💳', popular: false },
  { name: 'US Bank', logo: '🏦', popular: false },
  { name: 'PNC Bank', logo: '🏛️', popular: false },
]

export default function ConnectBankPage() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBanks = supportedBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName)
  }

  const handleConnect = async () => {
    if (!selectedBank) return
    
    setIsConnecting(true)
    setConnectionStatus('connecting')
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setConnectionStatus('success')
    } catch (error) {
      setConnectionStatus('error')
    } finally {
      setIsConnecting(false)
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />
      case 'error':
        return <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
      case 'connecting':
        return <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'success':
        return 'Bank account connected successfully!'
      case 'error':
        return 'Failed to connect. Please try again.'
      case 'connecting':
        return 'Connecting to your bank...'
      default:
        return ''
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <BanknotesIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Connect Your Bank</h1>
              <p className="text-gray-600 mt-2">
                Securely link your bank accounts to automatically sync transactions and balances.
              </p>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        {connectionStatus !== 'idle' && (
          <div className={`mb-6 p-4 rounded-lg border ${
            connectionStatus === 'success' ? 'bg-green-50 border-green-200' :
            connectionStatus === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center">
              {getStatusIcon()}
              <span className={`ml-3 text-sm font-medium ${
                connectionStatus === 'success' ? 'text-green-800' :
                connectionStatus === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {getStatusMessage()}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bank Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Bank</h2>
            
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for your bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bank List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => handleBankSelect(bank.name)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedBank === bank.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{bank.logo}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{bank.name}</div>
                        {bank.popular && (
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedBank === bank.name && (
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Connection Details */}
          <div className="space-y-6">
            {/* Security Info */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-medium text-blue-900 mb-3">🔒 Secure Connection</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Bank-level encryption (256-bit SSL)</li>
                <li>• Read-only access to your accounts</li>
                <li>• Never store your banking credentials</li>
                <li>• Plaid-powered secure connections</li>
                <li>• FDIC-insured bank partnerships</li>
              </ul>
            </div>

            {/* What You'll Get */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-medium text-green-900 mb-3">✅ What You'll Get</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Automatic transaction sync</li>
                <li>• Real-time account balances</li>
                <li>• Categorized spending insights</li>
                <li>• Budget tracking across accounts</li>
                <li>• Financial health monitoring</li>
              </ul>
            </div>

            {/* Connect Button */}
            <button
              onClick={handleConnect}
              disabled={!selectedBank || isConnecting}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                selectedBank && !isConnecting
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isConnecting ? 'Connecting...' : `Connect to ${selectedBank || 'Bank'}`}
            </button>

            {/* Alternative Options */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Don't see your bank?</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Request Bank Addition
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
