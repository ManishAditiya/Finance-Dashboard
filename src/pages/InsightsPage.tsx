import InsightCard from '@/components/insights/InsightCard'
import MonthlyComparisonChart from '@/components/insights/MonthlyComparisonChart'
import SavingsRateBar from '@/components/insights/SavingsRateBar'
import TopCategoriesTable from '@/components/insights/TopCategoriesTable'
import { useInsights } from '@/hooks/useInsights'
import { formatCurrency } from '@/utils/formatCurrency'

export default function InsightsPage() {
  const {
    highestCategory,
    bestMonth,
    worstMonth,
    avgExpense,
    savingsRate,
    totalIncome,
  } = useInsights()

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Smart observations from your financial data
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          emoji="🔥"
          title="Highest Spending Category"
          value={highestCategory ? highestCategory.name : 'N/A'}
          subtitle={
            highestCategory
              ? `${formatCurrency(highestCategory.amount)} spent`
              : 'No expense data'
          }
          color="bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800"
        />
        <InsightCard
          emoji="📅"
          title="Best Savings Month"
          value={bestMonth ? bestMonth.month : 'N/A'}
          subtitle={
            bestMonth
              ? `Saved ${formatCurrency(bestMonth.savings)}`
              : 'No data'
          }
          color="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800"
        />
        <InsightCard
          emoji="📉"
          title="Highest Expense Month"
          value={worstMonth ? worstMonth.month : 'N/A'}
          subtitle={
            worstMonth
              ? `Spent ${formatCurrency(worstMonth.expenses)}`
              : 'No data'
          }
          color="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800"
        />
        <InsightCard
          emoji="📊"
          title="Avg Monthly Expense"
          value={formatCurrency(avgExpense)}
          subtitle={`Total income: ${formatCurrency(totalIncome)}`}
          color="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800"
        />
      </div>

      {/* Savings Rate */}
      <SavingsRateBar rate={savingsRate} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyComparisonChart />
        <TopCategoriesTable />
      </div>
    </div>
  )
}