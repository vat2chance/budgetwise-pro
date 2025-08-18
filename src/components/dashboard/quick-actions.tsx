'use client'

import Link from 'next/link'
import { 
  PlusIcon, 
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
    href: '/budgets/new',
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
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="block p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{action.name}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center mb-3">
          <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">AI Insights</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Your spending on dining out is 15% higher than last month. Consider setting a budget limit.
        </p>
        <Link
          href="/advisor"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Get More Insights
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Connected Chase Bank</span>
            <span className="text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Updated Grocery Budget</span>
            <span className="text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Generated Monthly Report</span>
            <span className="text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
