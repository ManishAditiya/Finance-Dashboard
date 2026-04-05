import { Transaction } from '@/types'

export function computeInsights(transactions: Transaction[]) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const income = transactions.filter((t) => t.type === 'income')

  // Total balance
  const totalIncome = income.reduce((s, t) => s + t.amount, 0)
  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpenses

  // Highest spending category
  const categoryTotals: Record<string, number> = {}
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })
  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // Spending by category (for pie chart)
  const spendingByCategory = Object.entries(categoryTotals).map(
    ([name, value]) => ({ name, value })
  )

  return {
    totalIncome,
    totalExpenses,
    balance,
    highestCategory: highestCategory
      ? { name: highestCategory[0], amount: highestCategory[1] }
      : null,
    spendingByCategory,
    categoryTotals,
  }
}
