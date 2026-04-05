import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useTransactionStore } from '@/store/useTransactionStore'
import { format, parseISO } from 'date-fns'

export default function BalanceTrendChart() {
  const { transactions } = useTransactionStore()

  // Group by month
  const monthMap: Record<string, { income: number; expenses: number }> = {}

  transactions.forEach((t) => {
    const month = format(parseISO(t.date), 'MMM yyyy')
    if (!monthMap[month]) monthMap[month] = { income: 0, expenses: 0 }
    if (t.type === 'income') monthMap[month].income += t.amount
    else monthMap[month].expenses += t.amount
  })

  const data = Object.entries(monthMap)
    .map(([month, values]) => ({
      month,
      Income: values.income,
      Expenses: values.expenses,
      Balance: values.income - values.expenses,
    }))
    .reverse()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        📈 Balance Trend
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number) =>
              [`₹${value.toLocaleString('en-IN')}`, '']
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Balance"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}