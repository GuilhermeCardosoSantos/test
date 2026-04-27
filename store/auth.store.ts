import { create } from "zustand"

type User = {
  codigo_grupo: string
  codigo_usuario: string
  nome_grupo: string
  nome_usuario: string
}

type AuthState = {
  user: User | null

  setAuth: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setAuth: (user) => {
    localStorage.setItem("user", JSON.stringify(user))

    set({ user })
  },

  logout: () => {
    localStorage.removeItem("user")

    set({ user: null })
  },
}))