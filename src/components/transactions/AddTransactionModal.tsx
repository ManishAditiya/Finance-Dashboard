import { useState } from 'react'
import { useTransactionStore } from '@/store/useTransactionStore'
import { Category, Transaction, TransactionType } from '@/types'
import { X } from 'lucide-react'

const categories: Category[] = [
  'Food', 'Transport', 'Shopping', 'Entertainment',
  'Health', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Other',
]

interface Props {
  onClose: () => void
  existing?: Transaction // if passed, we are editing
}

export default function AddTransactionModal({ onClose, existing }: Props) {
  const { addTransaction, updateTransaction } = useTransactionStore()
  const isEditing = !!existing

  const [form, setForm] = useState({
    description: existing?.description ?? '',
    amount: existing?.amount?.toString() ?? '',
    category: existing?.category ?? ('Food' as Category),
    type: existing?.type ?? ('expense' as TransactionType),
    date: existing?.date ?? new Date().toISOString().split('T')[0],
  })

  const [error, setError] = useState('')

  function handleSubmit() {
    if (!form.description.trim()) return setError('Description is required')
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setError('Enter a valid amount')

    const transaction: Transaction = {
      id: existing?.id ?? Date.now().toString(),
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    }

    if (isEditing) {
      updateTransaction(transaction)
    } else {
      addTransaction(transaction)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Grocery shopping"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 1500"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Type
            </label>
            <div className="flex gap-2">
              {(['expense', 'income'] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as Category })
              }
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors mt-1"
          >
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}