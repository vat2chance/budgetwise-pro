'use client'

import { useState } from 'react'

const categories = [
  'All Categories',
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Utilities',
  'Income',
  'Healthcare',
  'Travel'
]

const accounts = [
  'All Accounts',
  'Chase Checking',
  'Chase Credit Card',
  'Wells Fargo Savings',
  'Cash'
]

export function TransactionFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedAccount, setSelectedAccount] = useState('All Accounts')
  const [dateRange, setDateRange] = useState('last-30-days')
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')

  return (
    <div className="space-y-6">
      {/* Date Range */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Date Range</h3>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="last-7-days">Last 7 days</option>
          <option value="last-30-days">Last 30 days</option>
          <option value="last-90-days">Last 90 days</option>
          <option value="this-month">This month</option>
          <option value="last-month">Last month</option>
          <option value="this-year">This year</option>
          <option value="custom">Custom range</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Account Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account</h3>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {accounts.map((account) => (
            <option key={account} value={account}>{account}</option>
          ))}
        </select>
      </div>

      {/* Amount Range */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Amount Range</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Minimum Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Maximum Amount</label>
            <input
              type="number"
              placeholder="1000.00"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Filters</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 text-sm">
            💰 Income only
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 text-sm">
            💸 Expenses only
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 text-sm">
            🔄 Recurring transactions
          </button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 text-sm">
            🏷️ Uncategorized
          </button>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Clear All Filters
        </button>
      </div>
    </div>
  )
}
