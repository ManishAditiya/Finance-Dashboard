/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionTable from "@/components/transactions/TransactionTable";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import { useRoleStore } from "@/store/useRoleStore";
import { Plus } from "lucide-react";

export default function TransactionsPage() {
  const { role } = useRoleStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white truncate">
            Transactions
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            View and manage your transactions
          </p>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-colors flex-shrink-0"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      <TransactionFilters />
      <TransactionTable />

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
