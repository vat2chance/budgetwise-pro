'use client'

import { formatCurrency } from '@/lib/utils'

const metrics = {
  totalRevenue: 15420,
  totalCosts: 8920,
  netProfit: 6500,
  profitMargin: 42.2,
  averageOrderValue: 18.50,
  totalOrders: 835
}

export function BusinessMetrics() {
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
