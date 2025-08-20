'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Budget } from '@/types/budget'

interface EditBudgetModalProps {
  budget: Budget | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedBudget: Budget) => void
}

export function EditBudgetModal({ budget, isOpen, onClose, onSave }: EditBudgetModalProps) {
  const [formData, setFormData] = useState<Partial<Budget>>({})
  const [errors, setErrors] = useState<Partial<Budget>>({})

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        budgeted: budget.budgeted,
        frequency: budget.frequency,
        startDate: budget.startDate,
        notes: budget.notes || ''
      })
      setErrors({})
    }
  }, [budget])

  const handleInputChange = (field: keyof Budget, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Budget> = {}
    
    if (!formData.category?.trim()) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.budgeted || formData.budgeted <= 0) {
      newErrors.budgeted = 'Budget amount must be greater than 0'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !budget) {
      return
    }

    const updatedBudget: Budget = {
      ...budget,
      category: formData.category!,
      budgeted: formData.budgeted!,
      frequency: formData.frequency!,
      startDate: formData.startDate!,
      notes: formData.notes,
      // Recalculate remaining and status
      remaining: formData.budgeted! - budget.spent,
      status: (formData.budgeted! - budget.spent) < 0 ? 'over-budget' : 
              (formData.budgeted! - budget.spent) === 0 ? 'at-limit' : 'under-budget'
    }

    onSave(updatedBudget)
    onClose()
  }

  if (!isOpen || !budget) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Edit Budget</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              type="text"
              id="edit-category"
              value={formData.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Groceries, Entertainment"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Budget Amount */}
          <div>
            <label htmlFor="edit-budgeted" className="block text-sm font-medium text-gray-700 mb-1">
              Budget Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                id="edit-budgeted"
                value={formData.budgeted || ''}
                onChange={(e) => handleInputChange('budgeted', parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.budgeted ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.budgeted && (
              <p className="mt-1 text-sm text-red-600">{errors.budgeted}</p>
            )}
          </div>

          {/* Current Spent (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Spent
            </label>
            <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
              ${budget.spent.toFixed(2)}
            </div>
            <p className="mt-1 text-xs text-gray-500">This amount cannot be changed</p>
          </div>

          {/* Frequency */}
          <div>
            <label htmlFor="edit-frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frequency *
            </label>
            <select
              id="edit-frequency"
              value={formData.frequency || 'monthly'}
              onChange={(e) => handleInputChange('frequency', e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="edit-startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              id="edit-startDate"
              value={formData.startDate || ''}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="edit-notes"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional notes about this budget..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
