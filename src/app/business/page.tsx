import { BreakEvenCalculator } from '@/components/business/break-even-calculator'
import { ProductList } from '@/components/business/product-list'
import { BusinessMetrics } from '@/components/business/business-metrics'

export default function BusinessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Analytics</h1>
        <p className="mt-2 text-gray-600">
          Analyze your business performance with break-even analysis and unit economics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <BreakEvenCalculator />
          <ProductList />
        </div>

        {/* Sidebar */}
        <div>
          <BusinessMetrics />
        </div>
      </div>
    </div>
  )
}
