'use client'

import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatDate } from '@/lib/utils'

const mockTransactions = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    merchant: 'Starbucks',
    amount: -5.75,
    category: 'Food & Dining',
    account: 'Chase Credit Card',
    memo: 'Morning coffee'
  },
  {
    id: '2',
    date: new Date('2024-01-15'),
    merchant: 'Salary Deposit',
    amount: 8500,
    category: 'Income',
    account: 'Chase Checking',
    memo: 'Monthly salary'
  },
  {
    id: '3',
    date: new Date('2024-01-14'),
    merchant: 'Shell Gas Station',
    amount: -45.20,
    category: 'Transportation',
    account: 'Chase Credit Card',
    memo: 'Gas fill-up'
  },
  {
    id: '4',
    date: new Date('2024-01-14'),
    merchant: 'Walmart',
    amount: -89.45,
    category: 'Shopping',
    account: 'Chase Credit Card',
    memo: 'Groceries and household'
  },
  {
    id: '5',
    date: new Date('2024-01-13'),
    merchant: 'Netflix',
    amount: -15.99,
    category: 'Entertainment',
    account: 'Chase Credit Card',
    memo: 'Monthly subscription'
  }
]

export function TransactionList() {
  const [transactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  const filteredTransactions = transactions.filter(transaction =>
    transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.memo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'date':
        comparison = a.date.getTime() - b.date.getTime()
        break
      case 'amount':
        comparison = Math.abs(a.amount) - Math.abs(b.amount)
        break
      case 'merchant':
        comparison = a.merchant.localeCompare(b.merchant)
        break
      default:
        comparison = 0
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null
    return sortOrder === 'asc' ? (
      <ArrowUpIcon className="h-4 w-4" />
    ) : (
      <ArrowDownIcon className="h-4 w-4" />
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Recent Transactions</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Track your spending and income across all accounts
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'date', label: 'Date' },
              { key: 'amount', label: 'Amount' },
              { key: 'merchant', label: 'Merchant' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                  sortBy === key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span>{label}</span>
                {getSortIcon(key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                      {transaction.merchant}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {transaction.category}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="truncate">{transaction.memo}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.date)} • {transaction.account}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className="ml-4 text-right">
                  <p className={`text-lg sm:text-xl font-semibold ${
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedTransactions.length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-12 w-12" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding some transactions.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
