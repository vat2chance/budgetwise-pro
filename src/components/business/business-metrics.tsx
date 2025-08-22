'use client'

import { formatCurrency } from '@/lib/utils'

// This would typically come from an API or database
// For now, we'll use placeholder data that can be easily replaced
const useBusinessMetrics = () => {
  // TODO: Replace with actual API call to get business metrics
  // const { data, loading, error } = useQuery(['business-metrics'], fetchBusinessMetrics)
  
  return {
    metrics: {
      totalRevenue: 0, // Will be populated from real data
      totalCosts: 0,
      netProfit: 0,
      profitMargin: 0,
      averageOrderValue: 0,
      totalOrders: 0
    },
    loading: false,
    error: null
  }
}

const BusinessMetricsComponent = () => {
  const { metrics, loading, error } = useBusinessMetrics()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Metrics</h3>
          <p className="text-sm text-red-700">Unable to load business metrics. Please try again later.</p>
        </div>
      </div>
    )
  }

  // Show empty state when no data
  if (!metrics.totalRevenue && !metrics.totalCosts) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h4>
            <p className="text-gray-500 mb-4">Connect your business accounts to see your metrics here.</p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Connect Accounts
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show actual metrics when data is available
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Revenue</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(metrics.totalRevenue)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Costs</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(metrics.totalCosts)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Net Profit</span>
            <span className="text-sm font-medium text-green-600">
              {formatCurrency(metrics.netProfit)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Profit Margin</span>
            <span className="text-sm font-medium text-green-600">
              {metrics.profitMargin}%
            </span>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Indicators</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Average Order Value</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(metrics.averageOrderValue)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Orders</span>
            <span className="text-sm font-medium text-gray-900">
              {metrics.totalOrders.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Revenue per Order</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(metrics.totalRevenue / metrics.totalOrders)}
            </span>
          </div>
        </div>
      </div>

      {/* Business Tips */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">💼 Business Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Monitor your break-even point monthly</li>
          <li>• Track product margins to optimize pricing</li>
          <li>• Consider seasonal variations in costs</li>
          <li>• Review fixed costs quarterly</li>
          <li>• Set up automated cost tracking</li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="text-sm font-medium text-gray-900">Generate P&L Report</div>
            <div className="text-xs text-gray-500">Export monthly profit & loss</div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="text-sm font-medium text-gray-900">Update Product Costs</div>
            <div className="text-xs text-gray-500">Review and adjust pricing</div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="text-sm font-medium text-gray-900">Cash Flow Forecast</div>
            <div className="text-xs text-gray-500">Project future cash needs</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export function BusinessMetrics() {
  return <BusinessMetricsComponent />
}
