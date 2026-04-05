import { create } from 'zustand'
import { Role } from '@/types'

interface RoleStore {
  role: Role
  setRole: (role: Role) => void
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: 'viewer',
  setRole: (role) => set({ role }),
}))