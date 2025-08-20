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
  private getMockUser() {
    return {
      id: '1',
      email: 'demo@budgetwise.com',
      name: 'Demo User',
      subscription: {
        id: 'sub_123',
        status: 'active',
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
  async login(email: string, password: string) {
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

  async register(name: string, email: string, password: string) {
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

  async verifyToken() {
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

  async logout() {
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
  }) {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock checkout session
      return { sessionId: 'mock_session_' + Date.now() }
    }

    const response = await fetch(`${API_BASE_URL}/subscriptions/create-checkout-session`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(planData)
    })
    return this.handleResponse(response)
  }

  async createPortalSession() {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock portal session
      return { url: 'https://mock-stripe-portal.com' }
    }

    const response = await fetch(`${API_BASE_URL}/subscriptions/create-portal-session`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    })
    return this.handleResponse(response)
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

  async createBudget(budgetData: any) {
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

  async updateBudget(id: string, budgetData: any) {
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

  async createTransaction(transactionData: any) {
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

  async updateUserProfile(profileData: any) {
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
