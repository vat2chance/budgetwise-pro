'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'

import { Budget } from '@/types/budget'

interface BudgetSummaryProps {
  budgets?: Budget[]
}

export function BudgetSummary({ budgets = [] }: BudgetSummaryProps) {
  const [summaryData, setSummaryData] = useState({
    totalBudgeted: 0,
    totalSpent: 0,
    totalRemaining: 0,
    categories: 0,
    overBudget: 0,
    onTrack: 0,
    atLimit: 0
  })

  useEffect(() => {
    if (budgets.length > 0) {
      const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
      const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
      const totalRemaining = totalBudgeted - totalSpent
      
      const overBudget = budgets.filter(budget => budget.status === 'over-budget').length
      const atLimit = budgets.filter(budget => budget.status === 'at-limit').length
      const onTrack = budgets.filter(budget => budget.status === 'under-budget').length

      setSummaryData({
        totalBudgeted,
        totalSpent,
        totalRemaining,
        categories: budgets.length,
        overBudget,
        onTrack,
        atLimit
      })
    } else {
      setSummaryData({
        totalBudgeted: 0,
        totalSpent: 0,
        totalRemaining: 0,
        categories: 0,
        overBudget: 0,
        onTrack: 0,
        atLimit: 0
      })
    }
  }, [budgets])

  const progressPercentage = summaryData.totalBudgeted > 0 
    ? (summaryData.totalSpent / summaryData.totalBudgeted) * 100 
    : 0

  const getProgressColor = () => {
    if (summaryData.totalRemaining < 0) return 'bg-red-500'
    if (summaryData.totalRemaining === 0) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  if (budgets.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Summary</h3>
          <div className="text-center py-8">
            <p className="text-gray-500">No budgets created yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first budget to see summary data</p>
          </div>
        </div>
      </div>
    )
  }

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
            <span className={`text-sm font-medium ${
              summaryData.totalRemaining < 0 ? 'text-red-600' : 'text-green-600'
            }`}>
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
                className={`h-2 rounded-full ${getProgressColor()}`}
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
            <span className="text-sm text-gray-600">At Limit</span>
            <span className="text-sm font-medium text-yellow-600">{summaryData.atLimit}</span>
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

      {/* Budget Health Indicator */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Health</h3>
        <div className="text-center">
          {summaryData.totalRemaining < 0 ? (
            <div className="text-red-600">
              <div className="text-2xl font-bold mb-2">⚠️ Over Budget</div>
              <p className="text-sm text-gray-600">
                You&apos;re ${Math.abs(summaryData.totalRemaining).toFixed(2)} over your total budget
              </p>
            </div>
          ) : summaryData.totalRemaining === 0 ? (
            <div className="text-yellow-600">
              <div className="text-2xl font-bold mb-2">⚖️ At Limit</div>
              <p className="text-sm text-gray-600">
                You&apos;ve spent exactly your budgeted amount
              </p>
            </div>
          ) : (
            <div className="text-green-600">
              <div className="text-2xl font-bold mb-2">✅ On Track</div>
              <p className="text-sm text-gray-600">
                You have ${summaryData.totalRemaining.toFixed(2)} remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
