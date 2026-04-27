import { create } from "zustand"

type ThemeState = {
  theme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "dark" ? "light" : "dark"

      // aplica no HTML
      if (next === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      localStorage.setItem("theme", next)

      return { theme: next }
    }),

  setTheme: (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)

    set({ theme })
  },
}))