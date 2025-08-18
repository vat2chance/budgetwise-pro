'use client'

import { DocumentArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline'

const reportHistory = [
  {
    id: '1',
    name: 'Monthly Report - January 2024',
    type: 'PDF',
    generatedAt: '2024-01-31T10:30:00Z',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Budget vs Actual - Q4 2023',
    type: 'Excel',
    generatedAt: '2024-01-15T14:20:00Z',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'Weekly Report - Week 3',
    type: 'PDF',
    generatedAt: '2024-01-22T09:15:00Z',
    size: '1.2 MB'
  },
  {
    id: '4',
    name: 'Monthly Report - December 2023',
    type: 'Excel',
    generatedAt: '2023-12-31T16:45:00Z',
    size: '2.1 MB'
  }
]

export function ReportHistory() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Report History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reportHistory.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{report.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{report.type}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{report.size}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{formatDate(report.generatedAt)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-3">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <DocumentArrowDownIcon className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Templates</h3>
        <div className="space-y-3">
          <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Standard Monthly Report</div>
            <div className="text-xs text-gray-500 mt-1">Income, expenses, and budget analysis</div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Business P&L Report</div>
            <div className="text-xs text-gray-500 mt-1">Profit & loss with break-even analysis</div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-sm font-medium text-gray-900">Cash Flow Report</div>
            <div className="text-xs text-gray-500 mt-1">Cash inflows and outflows tracking</div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">📊 Export Options</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>PDF:</strong> Print-ready reports with charts</li>
          <li>• <strong>Excel:</strong> Interactive spreadsheets with formulas</li>
          <li>• <strong>CSV:</strong> Raw data for external analysis</li>
          <li>• <strong>Auto-schedule:</strong> Set up recurring reports</li>
        </ul>
      </div>
    </div>
  )
}
