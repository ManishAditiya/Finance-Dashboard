interface Props {
  rate: number
}

export default function SavingsRateBar({ rate }: Props) {
  const clamped = Math.max(0, Math.min(100, rate))

  const color =
    clamped >= 50
      ? 'bg-green-500'
      : clamped >= 25
      ? 'bg-yellow-400'
      : 'bg-red-400'

  const label =
    clamped >= 50
      ? '🟢 Excellent savings!'
      : clamped >= 25
      ? '🟡 Moderate savings'
      : '🔴 Low savings — try to cut expenses'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        💰 Savings Rate
      </h2>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
        Percentage of income saved after expenses
      </p>

      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-700 ${color}`}
            style={{ width: `${clamped}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gray-700 dark:text-white w-12 text-right">
          {clamped.toFixed(1)}%
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{label}</p>
    </div>
  )
}