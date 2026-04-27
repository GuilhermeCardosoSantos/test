"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/store/theme.store"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setTheme = useThemeStore((s) => s.setTheme)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null

    if (saved) {
      setTheme(saved)
    }
  }, [])

  return <>{children}</>
}