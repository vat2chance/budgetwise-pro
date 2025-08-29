import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || !supabaseUrl || !supabaseAnonKey

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to get client safely
export const getSupabaseClient = () => {
  if (isDemoMode) {
    // Return a mock client for demo mode
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: (callback: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async (credentials: any) => {
          // Mock successful login for demo
          return {
            data: {
              user: {
                id: 'demo-user-id',
                email: credentials.email,
                user_metadata: { name: 'Demo User' }
              },
              session: {
                access_token: 'demo-token',
                refresh_token: 'demo-refresh-token'
              }
            },
            error: null
          }
        },
        signUp: async (credentials: any) => {
          // Mock successful signup for demo
          return {
            data: {
              user: {
                id: 'demo-user-id',
                email: credentials.email,
                user_metadata: { name: credentials.user_metadata?.name || 'Demo User' }
              },
              session: {
                access_token: 'demo-token',
                refresh_token: 'demo-refresh-token'
              }
            },
            error: null
          }
        },
        signOut: async () => ({ error: null })
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null })
          })
        })
      })
    }
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check environment variables.')
  }
  
  return supabase
}

// Export demo mode status
export const DEMO_MODE = isDemoMode
