import { useRoleStore } from '@/store/useRoleStore'
import { Role } from '@/types'

export default function RoleSwitcher() {
  const { role, setRole } = useRoleStore()

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-300">
      {(['viewer', 'admin'] as Role[]).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
            role === r
              ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {r === 'admin' ? '🛡' : '👁'}
          <span className="hidden sm:inline ml-1 capitalize">{r}</span>
        </button>
      ))}
    </div>
  )
}