// react
import { ReactNode } from "react"
// next
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autenticação",
}

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-10/12 max-w-md">

        <h1 className="text-primary text-xl sm:text-2xl  font-bold text-center">
          Bem-vindo à Innovation Brindes
        </h1>

        <div className="w-full bg-primary rounded-lg p-6">
          {children}
        </div>

      </div>
    </div>
  )
}