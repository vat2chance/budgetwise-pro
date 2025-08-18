'use client'

import { useState } from 'react'
import { 
  DocumentArrowDownIcon, 
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const reportTypes = [
  {
    id: 'weekly',
    name: 'Weekly Report',
    description: 'Cash flow, upcoming bills, and budget status',
    icon: CalendarIcon,
    formats: ['PDF', 'Excel', 'CSV']
  },
  {
    id: 'monthly',
    name: 'Monthly Report',
    description: 'Comprehensive financial summary with trends',
    icon: ChartBarIcon,
    formats: ['PDF', 'Excel', 'CSV']
  },
  {
    id: 'budget-vs-actual',
    name: 'Budget vs Actual',
    description: 'Detailed comparison with variance analysis',
    icon: DocumentTextIcon,
    formats: ['Excel', 'CSV']
  }
]

export function ReportGenerator() {
  const [selectedReport, setSelectedReport] = useState('monthly')
  const [selectedFormat, setSelectedFormat] = useState('PDF')
  const [dateRange, setDateRange] = useState('current-month')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would trigger a download
      alert('Report generated successfully! This would download the file in a real implementation.')
    }, 2000)
  }

  const selectedReportData = reportTypes.find(r => r.id === selectedReport)

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Select Report Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <report.icon className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
              </div>
              <p className="text-xs text-gray-600">{report.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="current-quarter">Current Quarter</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="current-year">Current Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {selectedReportData?.formats.map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Report Preview */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Report Preview</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Report Type:</span>
                <span className="font-medium text-gray-900">{selectedReportData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date Range:</span>
                <span className="font-medium text-gray-900">
                  {dateRange === 'current-month' ? 'January 2024' : 
                   dateRange === 'last-month' ? 'December 2023' :
                   dateRange === 'current-quarter' ? 'Q1 2024' :
                   dateRange === 'last-quarter' ? 'Q4 2023' :
                   dateRange === 'current-year' ? '2024' : 'Custom'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-medium text-gray-900">{selectedFormat}</span>
              </div>
              <div className="flex justify-between">
                <span>Includes:</span>
                <span className="font-medium text-gray-900">
                  {selectedFormat === 'Excel' ? 'Formulas & Charts' : 'Formatted Data'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Report...
              </>
            ) : (
              <>
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Generate {selectedReportData?.name}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
