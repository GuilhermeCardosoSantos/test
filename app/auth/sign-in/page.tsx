"use client"

// ui
import Button from '@/components/UI/button'
import Input from '@/components/UI/input'
// icon
import { UserRound, LockKeyholeOpen } from 'lucide-react'
// hooks
import { useEffect, useState } from 'react'
import { useSignIn } from '@/hooks/useSignIn'
import { useAuthStore } from "@/store/auth.store"
import { SignInSkeleton } from '@/components/skeletons/sign-in-skeleton'
// toast
import toast from "react-hot-toast"
// next
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function SignInPage() {
    // states
    const [loading, setLoading] = useState(true)
    // hooks
    const setAuth = useAuthStore((s) => s.setAuth)
    const { mutate, isPending } = useSignIn()
    const router = useRouter()
    // function
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get("email")
        const senha = formData.get("senha")
        const remember = formData.get("remember")

        if (!email || !senha) {
            return toast.error("Preencha todos os campos obrigatórios.")
        }

        mutate(
            {
                email: String(email),
                senha: String(senha),
            },
            {
                onSuccess: (data) => {
                    if (!Number(data.status)) {
                        toast.error(data.message)
                        return
                    }
                    if (remember) {
                        document.cookie = `token=${data.token_de_acesso}; path=/; max-age=${60 * 60 * 24 * 7}`
                    } else {
                        document.cookie = `token=${data.token_de_acesso}; path=/`
                    }
                    setAuth(data.dados_usuario)
                    toast.success(`Bem vindo ${data.dados_usuario.nome_usuario}!`)
                    router.push("/produtos")
                },
                onError: (error) => {
                    console.error(error)
                    toast.error("Erro ao fazer login, tente mais tarde!")
                },
            }
        )
    }
    // effect
    useEffect(() => {
        // simula carregamento inicial (ex: validar token)
        const timer = setTimeout(() => {
            setLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <SignInSkeleton />
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center justify-center sm:mt-10'>
            <div>
                <div className='flex flex-col w-full gap-2'>
                    <Input name="email" placeholder="Usuário" icon={<UserRound size={26} />} />
                    <Input name="senha" placeholder="Senha" type="password" icon={<LockKeyholeOpen size={26} />} />
                </div>
                <div className='flex flex-col sm:flex-row w-full gap-2 h-15 text-center items-center justify-center sm:justify-between mt-3 sm:mt-0'>
                    <div className='flex items-center justify-center'>
                        <label className="flex items-center select-none gap-2 text-sm text-white cursor-pointer">
                            <input
                                name="remember"
                                type="checkbox"
                                className="w-4 h-4 accent-white cursor-pointer"
                            />
                            Manter logado
                        </label>
                    </div>
                    <div>
                        <Link
                            className='select-none text-white cursor-pointer hover:underline text-sm' href={''}                        >
                            Esqueceu a senha?
                        </Link>
                    </div>
                </div>
            </div>

            <div className='w-50 sm:mt-5'>
                <Button
                    type='submit'
                >
                    {isPending ? "Entrando..." : "Login"}
                </Button>
            </div>
        </form>
    )
}