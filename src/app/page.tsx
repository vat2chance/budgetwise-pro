import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { DashboardCharts } from '@/components/dashboard/dashboard-charts'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Welcome back! Here&apos;s your financial overview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <DashboardOverview />
            <DashboardCharts />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            <QuickActions />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
