import { useInsights } from '@/hooks/useInsights'
import { formatCurrency } from '@/utils/formatCurrency'

const categoryEmoji: Record<string, string> = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍',
  Entertainment: '🎬',
  Health: '💊',
  Utilities: '💡',
  Salary: '💼',
  Freelance: '💻',
  Investment: '📈',
  Other: '📦',
}

export default function TopCategoriesTable() {
  const { spendingByCategory, totalExpenses } = useInsights()

  const sorted = [...spendingByCategory]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  if (sorted.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500 text-sm transition-colors duration-300">
        No expense data
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        🏆 Top Spending Categories
      </h2>
      <div className="flex flex-col gap-3">
        {sorted.map(({ name, value }, index) => {
          const pct = totalExpenses > 0 ? (value / totalExpenses) * 100 : 0
          return (
            <div key={name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {categoryEmoji[name] || '📦'}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {index + 1}. {name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-800 dark:text-white">
                    {formatCurrency(value)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-indigo-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}