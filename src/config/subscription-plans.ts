import { SubscriptionPlan } from '@/types/auth'

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic budget tracking',
      'Up to 3 budget categories',
      'Simple reports',
      'Mobile responsive'
    ],
    stripePriceId: ''
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited budget categories',
      'Advanced analytics',
      'Export reports',
      'Email notifications',
      'Priority support'
    ],
    stripePriceId: 'price_basic_monthly'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    interval: 'month',
    features: [
      'Everything in Basic',
      'AI-powered insights',
      'Bank account integration',
      'Custom categories',
      'Advanced forecasting',
      'Team collaboration (up to 3)'
    ],
    stripePriceId: 'price_pro_monthly',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced security features',
      'API access',
      'White-label options'
    ],
    stripePriceId: 'price_enterprise_monthly'
  }
]

export const yearlyPlans: SubscriptionPlan[] = subscriptionPlans.map(plan => ({
  ...plan,
  id: `${plan.id}-yearly`,
  price: plan.price * 10, // 2 months free with yearly
  interval: 'year',
  stripePriceId: plan.stripePriceId.replace('monthly', 'yearly')
}))

export const getPlanById = (id: string): SubscriptionPlan | undefined => {
  return [...subscriptionPlans, ...yearlyPlans].find(plan => plan.id === id)
}
