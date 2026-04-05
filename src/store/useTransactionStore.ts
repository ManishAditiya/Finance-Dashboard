import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Transaction, Filter } from '@/types'
import { mockTransactions } from '@/data/mockTransactions'

interface TransactionStore {
  transactions: Transaction[]
  filter: Filter
  addTransaction: (t: Transaction) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (t: Transaction) => void
  updateFilter: (partial: Partial<Filter>) => void
  resetFilter: () => void
}

const defaultFilter: Filter = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      filter: defaultFilter,

      addTransaction: (t) =>
        set((state) => ({
          transactions: [t, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updated.id ? updated : t
          ),
        })),

      updateFilter: (partial) =>
        set((state) => ({
          filter: { ...state.filter, ...partial },
        })),

      resetFilter: () => set({ filter: defaultFilter }),
    }),
    {
      name: 'finance-transactions', // key in localStorage
      partialize: (state) => ({ transactions: state.transactions }), // only persist transactions, not filters
    }
  )
)