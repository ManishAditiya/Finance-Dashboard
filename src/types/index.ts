export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Health'
  | 'Utilities'
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Other'

export type TransactionType = 'income' | 'expense'

export type Role = 'admin' | 'viewer'

export interface Transaction {
  id: string
  date: string           // ISO format: "2024-03-15"
  amount: number
  category: Category
  type: TransactionType
  description: string
}

export interface Filter {
  search: string
  type: 'all' | TransactionType
  category: Category | 'all'
  sortBy: 'date' | 'amount'
  sortOrder: 'asc' | 'desc'
}