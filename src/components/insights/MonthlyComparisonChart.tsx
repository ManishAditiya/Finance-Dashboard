import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useInsights } from '@/hooks/useInsights'

export default function MonthlyComparisonChart() {
  const { months } = useInsights()

  const data = [...months].reverse()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        📊 Monthly Income vs Expenses
      </h2>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#f9fafb',
              }}
              formatter={(value: number) => [
                `₹${value.toLocaleString('en-IN')}`,
                '',
              ]}
            />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{value}</span>
              )}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#f87171"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="savings"
              name="Savings"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}