import { useTransactionStore } from "@/store/useTransactionStore";
import { computeInsights } from "@/utils/computeInsights";
import { formatCurrency } from "@/utils/formatCurrency";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryCards() {
  const { transactions } = useTransactionStore();
  const { totalIncome, totalExpenses, balance } = computeInsights(transactions);

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      icon: Wallet,
      color:
        "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color:
        "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors duration-300"
        >
          <div className={`p-3 rounded-xl flex-shrink-0 ${color}`}>
            <Icon size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
              {label}
            </p>
            <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mt-0.5 truncate">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
