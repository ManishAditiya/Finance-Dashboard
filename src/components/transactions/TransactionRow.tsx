import { Transaction } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { format, parseISO } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import { useRoleStore } from '@/store/useRoleStore'
import { useTransactionStore } from '@/store/useTransactionStore'

interface Props {
  transaction: Transaction
  onEdit: (t: Transaction) => void
}

const categoryEmoji: Record<string, string> = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍',
  Entertainment: '🎬',
  Health: '💊',
  Utilities: '💡',
  Salary: '💼',
  Freelance: '💻',
  Investment: '📈',
  Other: '📦',
}

export default function TransactionRow({ transaction, onEdit }: Props) {
  const { date, amount, category, type, description } = transaction
  const { role } = useRoleStore()
  const { deleteTransaction } = useTransactionStore()

  return (
    <tr className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      {/* Date */}
      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {format(parseISO(date), 'dd MMM yyyy')}
      </td>

      {/* Description */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryEmoji[category] || '📦'}</span>
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            {description}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="py-3 px-4">
        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
          {category}
        </span>
      </td>

      {/* Type */}
      <td className="py-3 px-4">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
            type === 'income'
              ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400'
          }`}
        >
          {type}
        </span>
      </td>

      {/* Amount */}
      <td
        className={`py-3 px-4 text-sm font-bold text-right ${
          type === 'income'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-500 dark:text-red-400'
        }`}
      >
        {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
      </td>

      {/* Admin Actions */}
      {role === 'admin' && (
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
              title="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}