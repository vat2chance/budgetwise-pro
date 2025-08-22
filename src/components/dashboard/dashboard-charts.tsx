'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const spendingData = [
  { month: 'Jan', amount: 6200 },
  { month: 'Feb', amount: 5800 },
  { month: 'Mar', amount: 6500 },
  { month: 'Apr', amount: 5900 },
  { month: 'May', amount: 6300 },
  { month: 'Jun', amount: 6100 },
]

const categoryData = [
  { name: 'Housing', value: 1800, color: '#3B82F6' },
  { name: 'Food', value: 800, color: '#10B981' },
  { name: 'Transportation', value: 600, color: '#F59E0B' },
  { name: 'Utilities', value: 400, color: '#EF4444' },
  { name: 'Entertainment', value: 300, color: '#8B5CF6' },
  { name: 'Other', value: 1300, color: '#6B7280' },
]

export function DashboardCharts() {
  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      {/* Spending Trends */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Spending Trends</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Spending by Category</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={60}
                innerRadius={20}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Mobile-friendly category legend */}
        <div className="mt-4 sm:hidden">
          <div className="grid grid-cols-2 gap-2">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-700">{entry.name}</span>
                <span className="text-gray-500 ml-auto">${entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
