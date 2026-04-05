import { useTransactionStore } from '@/store/useTransactionStore'
import { computeInsights } from '@/utils/computeInsights'
import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'

export function useInsights() {
  const { transactions } = useTransactionStore()

  return useMemo(() => {
    const base = computeInsights(transactions)

    // Monthly breakdown
    const monthMap: Record<string, { income: number; expenses: number }> = {}
    transactions.forEach((t) => {
      const month = format(parseISO(t.date), 'MMM yyyy')
      if (!monthMap[month]) monthMap[month] = { income: 0, expenses: 0 }
      if (t.type === 'income') monthMap[month].income += t.amount
      else monthMap[month].expenses += t.amount
    })

    const months = Object.entries(monthMap).map(([month, values]) => ({
      month,
      income: values.income,
      expenses: values.expenses,
      savings: values.income - values.expenses,
    }))

    // Month with highest expenses
    const worstMonth = [...months].sort(
      (a, b) => b.expenses - a.expenses
    )[0]

    // Month with highest savings
    const bestMonth = [...months].sort(
      (a, b) => b.savings - a.savings
    )[0]

    // Average monthly expense
    const avgExpense =
      months.length > 0
        ? months.reduce((s, m) => s + m.expenses, 0) / months.length
        : 0

    // Savings rate
    const savingsRate =
      base.totalIncome > 0
        ? ((base.totalIncome - base.totalExpenses) / base.totalIncome) * 100
        : 0

    return {
      ...base,
      months,
      worstMonth,
      bestMonth,
      avgExpense,
      savingsRate,
    }
  }, [transactions])
}