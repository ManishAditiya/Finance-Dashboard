import { useTransactionStore } from '@/store/useTransactionStore'
import { Category } from '@/types'
import { Search, X } from 'lucide-react'

const categories: (Category | 'all')[] = [
  'all', 'Food', 'Transport', 'Shopping',
  'Entertainment', 'Health', 'Utilities',
  'Salary', 'Freelance', 'Investment', 'Other',
]

export default function TransactionFilters() {
  const { filter, updateFilter, resetFilter } = useTransactionStore()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 transition-colors duration-300">

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filter.search}
          onChange={(e) => updateFilter({ search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-colors duration-300"
        />
      </div>

      <div className="flex flex-wrap gap-3">

        {/* Type Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Type
          </label>
          <select
            value={filter.type}
            onChange={(e) =>
              updateFilter({ type: e.target.value as typeof filter.type })
            }
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-colors duration-300"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Category
          </label>
          <select
            value={filter.category}
            onChange={(e) =>
              updateFilter({ category: e.target.value as typeof filter.category })
            }
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-colors duration-300"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Sort By
          </label>
          <select
            value={filter.sortBy}
            onChange={(e) =>
              updateFilter({ sortBy: e.target.value as typeof filter.sortBy })
            }
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-colors duration-300"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Order
          </label>
          <select
            value={filter.sortOrder}
            onChange={(e) =>
              updateFilter({ sortOrder: e.target.value as typeof filter.sortOrder })
            }
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-colors duration-300"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex flex-col justify-end">
          <button
            onClick={resetFilter}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <X size={14} />
            Reset
          </button>
        </div>

      </div>
    </div>
  )
}