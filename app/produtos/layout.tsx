"use client"

// next
import Image from "next/image"
import { useRouter } from "next/navigation"
// store
import { useAuthStore } from "@/store/auth.store"
// icon
import { Mail, Phone, UserRound, Sun, Moon, LogOut } from "lucide-react"
// theme
import { useThemeStore } from "@/store/theme.store"

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // hooks
    const { theme, toggleTheme } = useThemeStore()
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const router = useRouter()
    // functions
    const handleLogout = () => {
        logout()
        document.cookie = "token=; path=/; max-age=0"
        router.push("/auth/sign-in")
    }
    // util
    const today = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })

    return (
        <div className="min-h-screen bg-background ">

            <header className="bg-primary text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                    <div className="flex gap-2 bg-white py-2 px-3 rounded-xl items-center">
                        <Image
                            src="https://imgproductioncrm.s3.us-east-2.amazonaws.com/logobanner.png"
                            alt="Logo"
                            width={110}
                            height={36}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">

                        <div className="hidden sm:flex items-center gap-4">

                            <div className="relative">
                                <Mail size={18} />

                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                                    11
                                </span>
                            </div>

                            <div className="relative">
                                <Phone size={18} />

                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                                    11
                                </span>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-white/10 transition"
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg hover:bg-white/10 transition"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">

                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full overflow-hidden">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                                    <UserRound size={18} className="text-primary" />
                                </div>
                            </div>

                            <div className="hidden sm:block text-right text-sm">
                                <p className="leading-tight">{user?.nome_usuario}</p>
                                <p className="text-xs opacity-80 capitalize">{today}</p>
                            </div>

                        </div>

                    </div>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-3 flex">
                {children}
            </main>

        </div>
    )
}