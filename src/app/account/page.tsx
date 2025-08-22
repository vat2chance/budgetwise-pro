'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  CreditCardIcon,
  ShieldCheckIcon,
  BellIcon,
  CogIcon,
  KeyIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // In a real app, you'd call an API to update the profile
    setTimeout(() => {
      setIsEditing(false)
      setLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'trialing':
        return 'text-yellow-600 bg-yellow-100'
      case 'past_due':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getSubscriptionStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'trialing':
        return 'Trial'
      case 'past_due':
        return 'Past Due'
      default:
        return 'Inactive'
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile, subscription, and account preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <UserCircleIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Profile Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.email}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <CreditCardIcon className="w-6 h-6 mr-2 text-green-600" />
                  Subscription Details
                </h2>
                <a
                  href="/subscription"
                  className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                >
                  Manage Subscription
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Plan
                  </label>
                  <p className="text-gray-900">{user?.subscription?.planName || 'Free Plan'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionStatusColor(user?.subscription?.status || 'inactive')}`}>
                    {getSubscriptionStatusText(user?.subscription?.status || 'inactive')}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Billing Date
                  </label>
                  <p className="text-gray-900">
                    {user?.subscription?.currentPeriodEnd 
                      ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan ID
                  </label>
                  <p className="text-gray-900 font-mono text-sm">{user?.subscription?.id || 'free'}</p>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
                <ShieldCheckIcon className="w-6 h-6 mr-2 text-red-600" />
                Account Security
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-600">Last changed: Never</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
                <CogIcon className="w-6 h-6 mr-2 text-purple-600" />
                Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Get notified about important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Member since:</span>
                  <span className="ml-auto text-gray-900">
                    {user?.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'Recently'
                    }
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Email verified:</span>
                  <span className="ml-auto text-green-600">✓ Yes</span>
                </div>

                <div className="flex items-center text-sm">
                  <KeyIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Account type:</span>
                  <span className="ml-auto text-gray-900">
                    {user?.email === 'Vat2chance@gmail.com' ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <a
                  href="/subscription"
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Upgrade Plan
                </a>
                
                <a
                  href="/support"
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Get Support
                </a>

                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
              
              <div className="space-y-3">
                <button className="block w-full px-4 py-2 text-sm font-medium text-center text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                  <TrashIcon className="w-4 h-4 inline mr-2" />
                  Delete Account
                </button>
              </div>
              
              <p className="text-xs text-red-600 mt-3">
                These actions cannot be undone. Please proceed with caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
