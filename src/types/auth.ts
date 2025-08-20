export interface User {
  id: string
  email: string
  name: string
  subscription?: {
    id: string
    status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid'
    planId: string
    planName: string
    currentPeriodStart: string
    currentPeriodEnd: string
    cancelAtPeriodEnd: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
  current?: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginFormData) => Promise<{ success: boolean; error?: string }>
  signup: (data: SignupFormData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateSubscription: (planId: string) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
}
