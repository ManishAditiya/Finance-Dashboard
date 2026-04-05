interface Props {
  emoji: string
  title: string
  value: string
  subtitle: string
  color: string
}

export default function InsightCard({
  emoji,
  title,
  value,
  subtitle,
  color,
}: Props) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm border flex flex-col gap-2 transition-colors duration-300 ${color}`}
    >
      <div className="text-2xl">{emoji}</div>
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {title}
      </p>
      <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  )
}