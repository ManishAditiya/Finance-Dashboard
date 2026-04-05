/* eslint-disable */
// @ts-nocheck

import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className="relative flex-shrink-0 w-14 h-7 rounded-full bg-indigo-600 transition-colors duration-300 focus:outline-none"
    >
      <Sun
        size={12}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 text-yellow-300"
      />
      <Moon
        size={12}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white"
      />
      <span
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-0" : "translate-x-7"
        }`}
      />
    </button>
  );
}
