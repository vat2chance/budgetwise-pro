import { AdvisorChat } from '@/components/advisor/advisor-chat'
import { AdvisorInsights } from '@/components/advisor/advisor-insights'

export default function AdvisorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Financial Advisor</h1>
        <p className="mt-2 text-gray-600">
          Get personalized insights and recommendations to improve your financial health.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main chat interface */}
        <div className="lg:col-span-2">
          <AdvisorChat />
        </div>

        {/* Sidebar with insights */}
        <div>
          <AdvisorInsights />
        </div>
      </div>
    </div>
  )
}
