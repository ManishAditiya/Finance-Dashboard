/* eslint-disable */
// @ts-nocheck
import RoleSwitcher from "./RoleSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useRoleStore } from "@/store/useRoleStore";
import { Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: Props) {
  const { role } = useRoleStore();

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 transition-colors duration-300">
      {/* Left — Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-bold text-indigo-600 md:hidden">
          💰 FinanceApp
        </h1>
      </div>

      {/* Center — Role info (desktop only) */}
      <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
        Logged in as:{" "}
        <span className="font-semibold text-gray-800 dark:text-white capitalize">
          {role}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
        <ThemeToggle />
        <RoleSwitcher />
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {role === "admin" ? "A" : "V"}
        </div>
      </div>
    </header>
  );
}
