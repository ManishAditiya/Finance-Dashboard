import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useTransactionStore } from '@/store/useTransactionStore'
import { computeInsights } from '@/utils/computeInsights'

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b',
  '#ef4444', '#14b8a6', '#8b5cf6',
  '#ec4899', '#f97316',
]

export default function SpendingPieChart() {
  const { transactions } = useTransactionStore()
  const { spendingByCategory } = computeInsights(transactions)

  if (spendingByCategory.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center h-64 text-gray-400 dark:text-gray-500 text-sm transition-colors duration-300">
        No expense data available
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        🍩 Spending Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={spendingByCategory}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {spendingByCategory.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg, #fff)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number) => [
              `₹${value.toLocaleString('en-IN')}`,
              'Amount',
            ]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}