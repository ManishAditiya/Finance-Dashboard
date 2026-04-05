import { useState } from 'react'
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions'
import TransactionRow from './TransactionRow'
import AddTransactionModal from './AddTransactionModal'
import { Transaction } from '@/types'
import { useRoleStore } from '@/store/useRoleStore'

export default function TransactionTable() {
  const transactions = useFilteredTransactions()
  const { role } = useRoleStore()
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No transactions found
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
          Try adjusting your filters
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Type
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Amount
                </th>
                {/* Admin only column */}
                {role === 'admin' && (
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <TransactionRow
                  key={t.id}
                  transaction={t}
                  onEdit={(t) => setEditingTransaction(t)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing {transactions.length} transaction
            {transactions.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <AddTransactionModal
          existing={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </>
  )
}