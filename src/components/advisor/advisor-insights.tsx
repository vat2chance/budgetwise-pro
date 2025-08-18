'use client'

import { formatCurrency } from '@/lib/utils'

const insights = [
  {
    id: '1',
    type: 'savings' as const,
    title: 'Savings Opportunity',
    description: 'You could save $200/month by reducing dining out expenses',
    impact: 200,
    category: 'Food & Dining'
  },
  {
    id: '2',
    type: 'alert' as const,
    title: 'Budget Alert',
    description: 'Transportation spending is 30% over budget this month',
    impact: -120,
    category: 'Transportation'
  },
  {
    id: '3',
    type: 'tip' as const,
    title: 'Smart Tip',
    description: 'Consider setting up automatic transfers to savings',
    impact: 0,
    category: 'Savings'
  }
]

export function AdvisorInsights() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'savings':
        return '💰'
      case 'alert':
        return '⚠️'
      case 'tip':
        return '💡'
      default:
        return '📊'
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'savings':
        return 'border-green-200 bg-green-50'
      case 'alert':
        return 'border-red-200 bg-red-50'
      case 'tip':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{getInsightIcon(insight.type)}</span>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{insight.category}</span>
                    {insight.impact !== 0 && (
                      <span className={`text-xs font-medium ${
                        insight.impact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {insight.impact > 0 ? '+' : ''}{formatCurrency(insight.impact)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Health Score</h3>
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.75)}`}
                className="text-green-500"
              />
            </svg>
            <div className="absolute">
              <span className="text-2xl font-bold text-gray-900">75</span>
              <span className="text-sm text-gray-500">/100</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Good financial health</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Emergency fund is well-funded (6 months of expenses)</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">!</span>
            <span>Consider increasing retirement contributions</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">×</span>
            <span>High credit card utilization (45%)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Diversified investment portfolio</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
