'use client'

import { useState } from 'react'
import { 
  PencilIcon, 
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { formatCurrency } from '@/lib/utils'

const mockBudgets = [
  {
    id: '1',
    category: 'Housing',
    budgeted: 1800,
    spent: 1800,
    remaining: 0,
    frequency: 'monthly',
    status: 'at-limit' as const
  },
  {
    id: '2',
    category: 'Food & Dining',
    budgeted: 600,
    spent: 450,
    remaining: 150,
    frequency: 'monthly',
    status: 'under-budget' as const
  },
  {
    id: '3',
    category: 'Transportation',
    budgeted: 400,
    spent: 520,
    remaining: -120,
    frequency: 'monthly',
    status: 'over-budget' as const
  },
  {
    id: '4',
    category: 'Entertainment',
    budgeted: 200,
    spent: 150,
    remaining: 50,
    frequency: 'monthly',
    status: 'under-budget' as const
  },
  {
    id: '5',
    category: 'Car Insurance',
    budgeted: 1200,
    spent: 0,
    remaining: 1200,
    frequency: 'yearly',
    status: 'under-budget' as const
  }
]

export function BudgetList() {
  const [budgets] = useState(mockBudgets)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over-budget':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'at-limit':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      case 'under-budget':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over-budget':
        return 'text-red-600 bg-red-50'
      case 'at-limit':
        return 'text-yellow-600 bg-yellow-50'
      case 'under-budget':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'over-budget':
        return 'bg-red-500'
      case 'at-limit':
        return 'bg-yellow-500'
      case 'under-budget':
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Budget Categories</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {budgets.map((budget) => {
          const progressPercentage = Math.min((budget.spent / budget.budgeted) * 100, 100)
          
          return (
            <div key={budget.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(budget.status)}
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{budget.category}</h3>
                    <p className="text-xs text-gray-500 capitalize">{budget.frequency}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budgeted</span>
                  <span className="font-medium text-gray-900">{formatCurrency(budget.budgeted)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-medium text-gray-900">{formatCurrency(budget.spent)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining</span>
                  <span className={`font-medium ${budget.remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatCurrency(budget.remaining)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(budget.status)}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    {progressPercentage.toFixed(1)}% used
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                    {budget.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
