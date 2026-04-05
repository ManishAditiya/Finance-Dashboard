import { useTransactionStore } from '@/store/useTransactionStore'
import { useMemo } from 'react'

export function useFilteredTransactions() {
  const { transactions, filter } = useTransactionStore()

  return useMemo(() => {
    let result = [...transactions]

    // Filter by type
    if (filter.type !== 'all') {
      result = result.filter((t) => t.type === filter.type)
    }

    // Filter by category
    if (filter.category !== 'all') {
      result = result.filter((t) => t.category === filter.category)
    }

    // Filter by search
    if (filter.search.trim()) {
      const q = filter.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    // Sort
    result.sort((a, b) => {
      if (filter.sortBy === 'date') {
        return filter.sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return filter.sortOrder === 'desc'
          ? b.amount - a.amount
          : a.amount - b.amount
      }
    })

    return result
  }, [transactions, filter])
}