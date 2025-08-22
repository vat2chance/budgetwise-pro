'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { 
  UsersIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  CogIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface AdminUser {
  id: string
  email: string
  name: string
  subscriptionStatus: string
  subscriptionPlan: string
  createdAt: string
  lastLoginAt: string
  isActive: boolean
}

interface SystemStats {
  totalUsers: number
  activeSubscriptions: number
  totalRevenue: number
  newUsersThisMonth: number
}

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    newUsersThisMonth: 0
  })
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  // Check if user is admin (you can implement your own admin logic)
  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    
    // Check if user has admin access
    // In production, you'd check user.role === 'admin' from database
    if (user.email !== 'Vat2chance@gmail.com') {
      console.warn('Non-admin user accessing admin panel')
      // For now, redirect non-admin users
      router.push('/')
      return
    }
    
    loadAdminData()
  }, [user, router])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      
      // Mock data for demo - in production, fetch from your API
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'john@example.com',
          name: 'John Doe',
          subscriptionStatus: 'active',
          subscriptionPlan: 'pro',
          createdAt: '2024-01-15T10:00:00Z',
          lastLoginAt: '2024-01-20T14:30:00Z',
          isActive: true
        },
        {
          id: '2',
          email: 'jane@example.com',
          name: 'Jane Smith',
          subscriptionStatus: 'trialing',
          subscriptionPlan: 'basic',
          createdAt: '2024-01-18T09:15:00Z',
          lastLoginAt: '2024-01-19T16:45:00Z',
          isActive: true
        },
        {
          id: '3',
          email: 'bob@example.com',
          name: 'Bob Johnson',
          subscriptionStatus: 'past_due',
          subscriptionPlan: 'pro',
          createdAt: '2024-01-10T11:20:00Z',
          lastLoginAt: '2024-01-15T13:20:00Z',
          isActive: false
        }
      ]
      
      const mockStats: SystemStats = {
        totalUsers: mockUsers.length,
        activeSubscriptions: mockUsers.filter(u => u.subscriptionStatus === 'active').length,
        totalRevenue: 299.70, // Mock revenue
        newUsersThisMonth: mockUsers.filter(u => {
          const created = new Date(u.createdAt)
          const now = new Date()
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
        }).length
      }
      
      setUsers(mockUsers)
      setStats(mockStats)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: 'activate' | 'deactivate' | 'delete') => {
    try {
      // In production, make API call to perform action
      console.log(`Performing ${action} on user ${userId}`)
      
      // Update local state
      setUsers(prev => prev.map(user => {
        if (user.id === userId) {
          if (action === 'delete') {
            return null
          }
          return {
            ...user,
            isActive: action === 'activate'
          }
        }
        return user
      }).filter(Boolean) as AdminUser[])
      
      // Refresh stats
      loadAdminData()
    } catch (error) {
      console.error(`Failed to ${action} user:`, error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      trialing: { color: 'bg-blue-100 text-blue-800', icon: ExclamationTriangleIcon },
      past_due: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
      canceled: { color: 'bg-gray-100 text-gray-800', icon: XCircleIcon }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.canceled
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage users, subscriptions, and system overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newUsersThisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">User Management</h2>
            <p className="text-sm text-gray-600">Manage user accounts and subscriptions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{user.subscriptionPlan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.subscriptionStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, user.isActive ? 'deactivate' : 'activate')}
                          className={`${
                            user.isActive 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.isActive ? (
                            <XCircleIcon className="h-4 w-4" />
                          ) : (
                            <CheckCircleIcon className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'delete')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <UsersIcon className="h-4 w-4 mr-2" />
              Add New User
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <CreditCardIcon className="h-4 w-4 mr-2" />
              Manage Plans
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              <CogIcon className="h-4 w-4 mr-2" />
              System Settings
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Subscription Plan</label>
                  <p className="text-sm text-gray-900 capitalize">{selectedUser.subscriptionPlan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedUser.subscriptionStatus)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Member Since</label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit user
                    setShowUserModal(false)
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}
