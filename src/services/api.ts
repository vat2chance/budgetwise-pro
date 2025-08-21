import { BudgetFormData } from '@/types/budget'
import { User } from '@/types/auth'

// API service for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

// Mock mode for testing when backend isn't available
const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || !process.env.NEXT_PUBLIC_API_URL

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  // Mock data for testing
  private getMockUser(): User {
    return {
      id: '1',
      email: 'demo@budgetwise.com',
      name: 'Demo User',
      subscription: {
        id: 'sub_123',
        status: 'active' as const,
        planId: 'pro',
        planName: 'Pro Plan',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const user = this.getMockUser()
      const token = 'mock_jwt_token_' + Date.now()
      
      return { user, token }
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return this.handleResponse(response)
  }

  async register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful registration
      const user = this.getMockUser()
      const token = 'mock_jwt_token_' + Date.now()
      
      return { user, token }
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    return this.handleResponse(response)
  }

  async verifyToken(): Promise<{ user: User; token: string }> {
    if (MOCK_MODE) {
      // Mock token verification
      const user = this.getMockUser()
      return { user, token: 'mock_jwt_token_' + Date.now() }
    }

    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  async logout(): Promise<{ success: boolean }> {
    if (MOCK_MODE) {
      // Mock logout
      return { success: true }
    }

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  // Subscription endpoints
  async createCheckoutSession(planData: {
    planId: string
    planName: string
    planPrice: number
    planInterval: string
  }): Promise<{ id: string; url: string; demoMode?: boolean }> {
    // Use Next.js API route for Stripe integration
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan: planData.planId })
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  async createPortalSession(): Promise<{ url: string }> {
    // For demo purposes, return a mock portal URL
    // In production, you'd use the Next.js API route with actual customer ID
    return { url: 'https://billing.stripe.com/session/test_demo' }
  }

  async getCurrentSubscription() {
    if (MOCK_MODE) {
      // Mock subscription data
      return {
        id: 'sub_123',
        status: 'active',
        planId: 'pro',
        planName: 'Pro Plan'
      }
    }

    const response = await fetch(`${API_BASE_URL}/subscriptions/current`, {
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  // Budget endpoints
  async getBudgets() {
    if (MOCK_MODE) {
      // Mock budgets data
      return [
        {
          id: '1',
          name: 'Groceries',
          amount: 500,
          spent: 320,
          remaining: 180,
          period: 'monthly',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true
        }
      ]
    }

    const response = await fetch(`${API_BASE_URL}/budgets`, {
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  async createBudget(budgetData: BudgetFormData) {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock budget creation
      return { id: 'budget_' + Date.now(), ...budgetData }
    }

    const response = await fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(budgetData)
    })
    return this.handleResponse(response)
  }

  async updateBudget(id: string, budgetData: Partial<BudgetFormData>) {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock budget update
      return { id, ...budgetData }
    }

    const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(budgetData)
    })
    return this.handleResponse(response)
  }

  async deleteBudget(id: string) {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock budget deletion
      return { success: true }
    }

    const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  // Transaction endpoints
  async getTransactions() {
    if (MOCK_MODE) {
      // Mock transactions data
      return [
        {
          id: '1',
          amount: 45.50,
          type: 'expense',
          description: 'Grocery shopping',
          date: new Date().toISOString(),
          categoryId: '1'
        }
      ]
    }

    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  async createTransaction(transactionData: { amount: number; type: string; description: string; date: string; categoryId: string }) {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock transaction creation
      return { id: 'transaction_' + Date.now(), ...transactionData }
    }

    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(transactionData)
    })
    return this.handleResponse(response)
  }

  // User endpoints
  async getUserProfile() {
    if (MOCK_MODE) {
      // Mock user profile
      return this.getMockUser()
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
  }

  async updateUserProfile(profileData: { name?: string; email?: string }) {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock profile update
      return { ...this.getMockUser(), ...profileData }
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData)
    })
    return this.handleResponse(response)
  }
}

export const apiService = new ApiService()
