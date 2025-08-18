import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Budget frequency normalization factors
export const FREQUENCY_FACTORS = {
  daily: 30.4375,
  weekly: 4.348,
  monthly: 1,
  yearly: 1/12
} as const

export function normalizeToMonthly(amount: number, frequency: keyof typeof FREQUENCY_FACTORS): number {
  return amount * FREQUENCY_FACTORS[frequency]
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// Affordability calculations
export function calculateAffordabilityRatios(
  housing: number,
  essentials: number,
  savings: number,
  netIncome: number
) {
  return {
    housingRatio: (housing / netIncome) * 100,
    essentialsRatio: (essentials / netIncome) * 100,
    savingsRate: (savings / netIncome) * 100,
  }
}

// Business break-even calculations
export function calculateBreakEven(
  fixedCosts: number,
  unitPrice: number,
  variableCostPerUnit: number
) {
  const contributionMargin = unitPrice - variableCostPerUnit
  const breakEvenUnits = fixedCosts / contributionMargin
  const breakEvenRevenue = breakEvenUnits * unitPrice
  const marginPercentage = (contributionMargin / unitPrice) * 100

  return {
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenRevenue,
    contributionMargin,
    marginPercentage,
  }
}
