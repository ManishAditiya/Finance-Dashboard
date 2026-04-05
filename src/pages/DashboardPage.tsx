import SummaryCards from '@/components/dashboard/SummaryCards'
import BalanceTrendChart from '@/components/dashboard/BalanceTrendChart'
import SpendingPieChart from '@/components/dashboard/SpendingPieChart'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your financial overview at a glance
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart />
        <SpendingPieChart />
      </div>
    </div>
  )
}