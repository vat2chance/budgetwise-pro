'use client'

import Link from 'next/link'
import { 
  BanknotesIcon, 
  ChartBarIcon,
  SparklesIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline'

const quickActions = [
  {
    name: 'Connect Bank',
    description: 'Link your accounts for automatic transaction sync',
    href: '/accounts/connect',
    icon: BanknotesIcon,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    name: 'Create Budget',
    description: 'Set up your first budget categories',
    href: '/budgets',
    icon: ChartBarIcon,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    name: 'AI Advisor',
    description: 'Get personalized financial insights',
    href: '/advisor',
    icon: SparklesIcon,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    name: 'Generate Report',
    description: 'Export your financial summary',
    href: '/reports',
    icon: DocumentChartBarIcon,
    color: 'bg-orange-500 hover:bg-orange-600'
  }
]

export function QuickActions() {
  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="block p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all touch-manipulation"
            >
              <div className="flex items-center">
                <div className={`p-2 sm:p-3 rounded-lg ${action.color} text-white flex-shrink-0`}>
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{action.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 sm:p-6 border border-purple-200">
        <div className="flex items-center mb-3">
          <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2 flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900">AI Insights</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Your spending on dining out is 15% higher than last month. Consider setting a budget limit.
        </p>
        <Link
          href="/advisor"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors touch-manipulation"
        >
          Get More Insights
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
            <span className="text-gray-600 mb-1 sm:mb-0">Connected Chase Bank</span>
            <span className="text-gray-400 text-xs sm:text-sm">2 hours ago</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
            <span className="text-gray-600 mb-1 sm:mb-0">Updated Grocery Budget</span>
            <span className="text-gray-400 text-xs sm:text-sm">1 day ago</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
            <span className="text-gray-600 mb-1 sm:mb-0">Generated Monthly Report</span>
            <span className="text-gray-400 text-xs sm:text-sm">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
