"use client"

// react
import { useState, useEffect } from "react"
// hooks
import { useProducts } from "@/hooks/useProducts"
// componets
import { ProductCard } from "@/components/product/product-card"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
// ui
import Button from "@/components/UI/button"
// type
type Product = {
    codigo: string
    codigo_categoria: string
    descricao: string
    imagem: string
    nome: string
    preco: number
    referencia: string
}

export default function ProductsPage() {
    // function
    const loadMore = () => {
        setProducts((prev) => [...prev, ...data])
    }
    // hooks
    const { data, isLoading, error } = useProducts()
    // states
    const [products, setProducts] = useState<Product[]>([])
    const [fakeError, setFakeError] = useState(true)
    // effect
    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data])
    useEffect(() => {
        const handleScroll = () => {
            if (!data || isLoading) return

            const bottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

            if (bottom) {
                loadMore()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        )
    }
    
    if (error || fakeError) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-center w-full mt-5">

                <p className="text-sm text-(--muted)">
                    Ocorreu um erro ao carregar os produtos.
                </p>

                <Button
                    onClick={() =>{
                        if(fakeError) return setFakeError(false)
                        window.location.reload()
                    }}
                    className="bg-primary cursor-pointer text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition"
                >
                    Tentar novamente
                </Button>

            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    )
}