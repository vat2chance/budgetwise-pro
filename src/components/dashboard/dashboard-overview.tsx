'use client'

import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { formatCurrency } from '@/lib/utils'

const mockData = {
  totalBalance: 15420.50,
  monthlyIncome: 8500,
  monthlyExpenses: 6200,
  savingsRate: 27.1,
  budgetStatus: 'on-track' as const,
  upcomingBills: [
    { name: 'Rent', amount: 1800, due: '2024-01-15' },
    { name: 'Car Insurance', amount: 120, due: '2024-01-20' },
  ]
}

export function DashboardOverview() {
  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6 col-span-2 lg:col-span-1">
          <div className="text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <BanknotesIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total Balance</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              {formatCurrency(mockData.totalBalance)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
          <div className="text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <ArrowTrendingUpIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Monthly Income</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              {formatCurrency(mockData.monthlyIncome)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
          <div className="text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <ArrowTrendingUpIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 rotate-180" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Monthly Expenses</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              {formatCurrency(mockData.monthlyExpenses)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
          <div className="text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Savings Rate</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              {mockData.savingsRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Budget Status */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Budget Status</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center">
            {mockData.budgetStatus === 'on-track' ? (
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mr-2" />
            )}
            <span className="text-sm sm:text-base font-medium text-gray-900">
              {mockData.budgetStatus === 'on-track' ? 'On Track' : 'Over Budget'}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            You&apos;re {mockData.budgetStatus === 'on-track' ? 'within' : 'over'} your monthly budget
          </div>
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Upcoming Bills</h3>
        <div className="space-y-3">
          {mockData.upcomingBills.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{bill.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">Due: {bill.due}</p>
              </div>
              <div className="ml-3">
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  {formatCurrency(bill.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
