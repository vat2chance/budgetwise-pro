import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { DashboardCharts } from '@/components/dashboard/dashboard-charts'
import { QuickActions } from '@/components/dashboard/quick-actions'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardOverview />
          <DashboardCharts />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
