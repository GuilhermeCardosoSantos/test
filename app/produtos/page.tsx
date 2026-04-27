"use client"

// react
import { useState, useEffect } from "react"
// hooks
import { useProducts } from "@/hooks/useProducts"
// componets
import { ProductCard } from "@/components/product/product-card"
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
    // effect
    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data])
    useEffect(() => {
        const handleScroll = () => {
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


    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro</p>

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    )
}