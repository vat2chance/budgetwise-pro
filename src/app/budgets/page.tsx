'use client'

import { useState } from 'react'
import { BudgetList } from '@/components/budgets/budget-list'
import { BudgetSummary } from '@/components/budgets/budget-summary'
import { CreateBudgetButton } from '@/components/budgets/create-budget-button'
import { Budget } from '@/types/budget'
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])

  const handleBudgetUpdated = (updatedBudgets: Budget[]) => {
    setBudgets(updatedBudgets)
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
              <p className="mt-2 text-gray-600">
                Manage your spending categories and track your progress.
              </p>
            </div>
            <CreateBudgetButton onBudgetCreated={(newBudget) => {
              setBudgets(prev => [...prev, newBudget])
            }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <BudgetList onBudgetUpdated={handleBudgetUpdated} />
          </div>

          {/* Sidebar */}
          <div>
            <BudgetSummary budgets={budgets} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
