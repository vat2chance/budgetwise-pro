'use client'

import { formatCurrency } from '@/lib/utils'

const summaryData = {
  totalBudgeted: 4200,
  totalSpent: 2920,
  totalRemaining: 1280,
  categories: 5,
  overBudget: 1,
  onTrack: 4
}

export function BudgetSummary() {
  const progressPercentage = (summaryData.totalSpent / summaryData.totalBudgeted) * 100

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Budgeted</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(summaryData.totalBudgeted)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Spent</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(summaryData.totalSpent)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Remaining</span>
            <span className="text-sm font-medium text-green-600">
              {formatCurrency(summaryData.totalRemaining)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Category Stats</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Categories</span>
            <span className="text-sm font-medium text-gray-900">{summaryData.categories}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">On Track</span>
            <span className="text-sm font-medium text-green-600">{summaryData.onTrack}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Over Budget</span>
            <span className="text-sm font-medium text-red-600">{summaryData.overBudget}</span>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">💡 Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Review your budget weekly to stay on track</li>
          <li>• Set up alerts for when you&apos;re approaching limits</li>
          <li>• Use envelopes for irregular expenses</li>
          <li>• Consider seasonal adjustments to your budget</li>
        </ul>
      </div>
    </div>
  )
}
