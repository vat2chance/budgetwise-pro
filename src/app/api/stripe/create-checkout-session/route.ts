import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if we're in demo mode (no real Stripe key)
const DEMO_MODE = !process.env.STRIPE_SECRET_KEY || 
                  process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') ||
                  process.env.STRIPE_SECRET_KEY === 'your-stripe-secret-key'

const stripe = DEMO_MODE ? null : new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json()

    if (DEMO_MODE) {
      // Return mock session for demo
      return NextResponse.json({
        id: 'cs_demo_' + Date.now(),
        url: '/subscription/success?demo=true',
        demoMode: true
      })
    }

    // For demo purposes, we'll use test price IDs
    // In production, you'd store these in your database
    // const testPriceIds: Record<string, string> = {
    //   'basic': 'price_1QeWyXP8WqwF3S7tGg7QQ2nB',
    //   'pro': 'price_1QeWyXP8WqwF3S7tGg7QQ2nB',
    //   'enterprise': 'price_1QeWyXP8WqwF3S7tGg7QQ2nB'
    // }

    // Create Stripe checkout session
    const session = await stripe!.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: 'price_1QeWyXP8WqwF3S7tGg7QQ2nB', // Use your actual Stripe price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscription/cancel`,
      metadata: {
        plan,
      },
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
