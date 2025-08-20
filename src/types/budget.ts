export interface Budget {
  id: string
  category: string
  budgeted: number
  spent: number
  remaining: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: string
  notes?: string
  status: 'under-budget' | 'at-limit' | 'over-budget'
}

export interface BudgetFormData {
  category: string
  budgeted: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: string
  notes?: string
}
