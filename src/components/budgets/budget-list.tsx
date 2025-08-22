'use client'

import { useState } from 'react'
import { 
  PencilIcon, 
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { formatCurrency } from '@/lib/utils'
import { EditBudgetModal } from './edit-budget-modal'
import { CreateBudgetButton } from './create-budget-button'
import { Budget } from '@/types/budget'

interface BudgetListProps {
  onBudgetUpdated?: (budgets: Budget[]) => void
}

const initialMockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Housing',
    budgeted: 1800,
    spent: 1800,
    remaining: 0,
    frequency: 'monthly',
    startDate: '2024-01-01',
    status: 'at-limit'
  },
  {
    id: '2',
    category: 'Food & Dining',
    budgeted: 600,
    spent: 450,
    remaining: 150,
    frequency: 'monthly',
    startDate: '2024-01-01',
    status: 'under-budget'
  },
  {
    id: '3',
    category: 'Transportation',
    budgeted: 400,
    spent: 520,
    remaining: -120,
    frequency: 'monthly',
    startDate: '2024-01-01',
    status: 'over-budget'
  },
  {
    id: '4',
    category: 'Entertainment',
    budgeted: 200,
    spent: 150,
    remaining: 50,
    frequency: 'monthly',
    startDate: '2024-01-01',
    status: 'under-budget'
  },
  {
    id: '5',
    category: 'Car Insurance',
    budgeted: 1200,
    spent: 0,
    remaining: 1200,
    frequency: 'yearly',
    startDate: '2024-01-01',
    status: 'under-budget'
  }
]

export function BudgetList({ onBudgetUpdated }: BudgetListProps) {
  const [budgets, setBudgets] = useState<Budget[]>(initialMockBudgets)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleBudgetCreated = (newBudget: Budget) => {
    const updatedBudgets = [...budgets, newBudget]
    setBudgets(updatedBudgets)
    if (onBudgetUpdated) {
      onBudgetUpdated(updatedBudgets)
    }
  }

  const handleBudgetEdited = (updatedBudget: Budget) => {
    const updatedBudgets = budgets.map(budget => 
      budget.id === updatedBudget.id ? updatedBudget : budget
    )
    setBudgets(updatedBudgets)
    if (onBudgetUpdated) {
      onBudgetUpdated(updatedBudgets)
    }
  }

  const handleBudgetDeleted = (budgetId: string) => {
    if (confirm('Are you sure you want to delete this budget? This action cannot be undone.')) {
      const updatedBudgets = budgets.filter(budget => budget.id !== budgetId)
      setBudgets(updatedBudgets)
      if (onBudgetUpdated) {
        onBudgetUpdated(updatedBudgets)
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over-budget':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'at-limit':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      case 'under-budget':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      default:
        return <CheckCircleIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over-budget':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'at-limit':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'under-budget':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
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
        return 'bg-gray-400'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Budgets</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Track your spending across different categories
          </p>
        </div>
        <CreateBudgetButton onBudgetCreated={handleBudgetCreated} />
      </div>

      {/* Budget Cards */}
      <div className="space-y-3 sm:space-y-4">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className="bg-white rounded-lg shadow-sm sm:shadow border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            {/* Budget Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
              <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                {getStatusIcon(budget.status)}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {budget.category}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(budget.status)}`}>
                      {budget.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {budget.frequency}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingBudget(budget)
                    setIsEditModalOpen(true)
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                  aria-label="Edit budget"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleBudgetDeleted(budget.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                  aria-label="Delete budget"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Budget Progress */}
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.budgeted)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                  <div
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${getProgressColor(budget.status)}`}
                    style={{
                      width: `${Math.min((budget.spent / budget.budgeted) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Budget Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Budgeted</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {formatCurrency(budget.budgeted)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Spent</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {formatCurrency(budget.spent)}
                  </p>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Remaining</p>
                  <p className={`text-sm sm:text-base font-semibold ${
                    budget.remaining < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {budget.remaining < 0 ? '-' : ''}{formatCurrency(Math.abs(budget.remaining))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBudget && (
        <EditBudgetModal
          budget={editingBudget}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingBudget(null)
          }}
          onSave={handleBudgetEdited}
        />
      )}
    </div>
  )
}
