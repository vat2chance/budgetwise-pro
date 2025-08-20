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

  const openEditModal = (budget: Budget) => {
    setEditingBudget(budget)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingBudget(null)
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Budget Categories</h2>
          <CreateBudgetButton onBudgetCreated={handleBudgetCreated} />
        </div>
      </div>
      
      {budgets.length === 0 ? (
        <div className="p-12 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <PlusIcon className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No budgets</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first budget.</p>
          <div className="mt-6">
            <CreateBudgetButton onBudgetCreated={handleBudgetCreated} />
          </div>
        </div>
      ) : (
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
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500 capitalize">{budget.frequency}</p>
                        {budget.notes && (
                          <span className="text-xs text-gray-400">• {budget.notes}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => openEditModal(budget)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit budget"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleBudgetDeleted(budget.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete budget"
                    >
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
      )}

      {/* Edit Budget Modal */}
      <EditBudgetModal
        budget={editingBudget}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleBudgetEdited}
      />
    </div>
  )
}
