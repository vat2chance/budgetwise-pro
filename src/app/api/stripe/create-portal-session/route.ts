import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json()

    // For demo purposes, return a mock portal URL
    // In production, you'd create a real customer portal session
    const portalUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/admin/subscriptions`
      : 'http://localhost:3000/admin/subscriptions'

    return NextResponse.json({ url: portalUrl })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
