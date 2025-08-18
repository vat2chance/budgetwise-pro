'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, calculateBreakEven } from '@/lib/utils'

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(10000)
  const [unitPrice, setUnitPrice] = useState(50)
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(20)

  const breakEvenData = calculateBreakEven(fixedCosts, unitPrice, variableCostPerUnit)
  
  // Generate chart data
  const chartData = []
  const maxUnits = Math.ceil(breakEvenData.breakEvenUnits * 1.5)
  
  for (let units = 0; units <= maxUnits; units += Math.ceil(maxUnits / 20)) {
    const revenue = units * unitPrice
    const totalCosts = fixedCosts + (units * variableCostPerUnit)
    const profit = revenue - totalCosts
    
    chartData.push({
      units,
      revenue,
      totalCosts,
      profit
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Break-Even Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fixed Costs (per month)
            </label>
            <input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Price
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variable Cost per Unit
            </label>
            <input
              type="number"
              value={variableCostPerUnit}
              onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Break-Even Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Break-Even Units:</span>
                <span className="text-sm font-medium text-blue-900">{breakEvenData.breakEvenUnits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Break-Even Revenue:</span>
                <span className="text-sm font-medium text-blue-900">{formatCurrency(breakEvenData.breakEvenRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Contribution Margin:</span>
                <span className="text-sm font-medium text-blue-900">{formatCurrency(breakEvenData.contributionMargin)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Margin %:</span>
                <span className="text-sm font-medium text-blue-900">{breakEvenData.marginPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-900 mb-2">Profitability Analysis</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">At 100 units:</span>
                <span className="text-sm font-medium text-green-900">
                  {formatCurrency((100 * unitPrice) - fixedCosts - (100 * variableCostPerUnit))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">At 200 units:</span>
                <span className="text-sm font-medium text-green-900">
                  {formatCurrency((200 * unitPrice) - fixedCosts - (200 * variableCostPerUnit))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Break-Even Chart</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="units" 
                label={{ value: 'Units Sold', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Amount']}
                labelFormatter={(label) => `${label} units`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="totalCosts" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Total Costs"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
