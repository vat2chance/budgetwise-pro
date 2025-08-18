import { ReportGenerator } from '@/components/reports/report-generator'
import { ReportHistory } from '@/components/reports/report-history'

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">
          Generate and export detailed financial reports with embedded formulas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <ReportGenerator />
        </div>

        {/* Sidebar */}
        <div>
          <ReportHistory />
        </div>
      </div>
    </div>
  )
}
