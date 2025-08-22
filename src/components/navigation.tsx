'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Logo } from '@/components/ui/logo'
import {
  HomeIcon,
  ChartBarIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  StarIcon,
  CogIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  adminOnly?: boolean
}

const allNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Budgets', href: '/budgets', icon: ChartBarIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Business', href: '/business', icon: BuildingOfficeIcon },
  { name: 'Admin', href: '/admin', icon: CogIcon, adminOnly: true },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Filter navigation items based on user permissions
  const navigation = allNavigation.filter(item => {
    if (item.adminOnly) {
      return user?.email === 'Vat2chance@gmail.com'
    }
    return true
  })

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Hide navigation on auth page
  if (pathname === '/auth') {
    return null
  }

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const getSubscriptionStatus = () => {
    if (!user?.subscription) return 'free'
    return user.subscription.status || 'free'
  }

  const getSubscriptionBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <StarIcon className="w-3 h-3 mr-1" />
            Pro
          </div>
        )
      case 'trialing':
        return (
          <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <StarIcon className="w-3 h-3 mr-1" />
            Trial
          </div>
        )
      case 'past_due':
        return (
          <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-400 to-pink-500 text-white">
            <StarIcon className="w-3 h-3 mr-1" />
            Past Due
          </div>
        )
      default:
        return (
          <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <StarIcon className="w-3 h-3 mr-1" />
            Free
          </div>
        )
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Logo className="w-8 h-8" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">BudgetWise Pro</span>
              <span className="ml-2 text-lg font-bold text-gray-900 sm:hidden">BW Pro</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>

          {/* User Menu and Mobile Button */}
          <div className="flex items-center space-x-2">
            {/* User Menu - Hidden on mobile */}
            <div className="hidden sm:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      {getSubscriptionBadge(getSubscriptionStatus())}
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </div>
                    <UserCircleIcon className="w-5 h-5 text-gray-400" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Sign in
                </a>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mobile-menu">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* User Info Section */}
            {user && (
              <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="mt-1">
                      {getSubscriptionBadge(getSubscriptionStatus())}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="px-2 py-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-6 h-6 mr-3 flex-shrink-0" />
                    {item.name}
                  </a>
                )
              })}
            </div>

            {/* Mobile User Actions */}
            {user ? (
              <div className="px-2 py-2 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-2 py-2 border-t border-gray-200">
                <a
                  href="/auth"
                  className="flex w-full items-center justify-center px-4 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Sign in
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
