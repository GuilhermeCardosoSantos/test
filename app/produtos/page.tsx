"use client"

// react
import { useState, useEffect } from "react"
// hooks
import { useProducts } from "@/hooks/useProducts"
// componets
import { ProductCard } from "@/components/product/product-card"

export default function ProductsPage() {
    // hooks
    const { data, isLoading, error } = useProducts()
    // states
    const [products, setProducts] = useState<any[]>([])
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
    }, [data])
    // function
    const loadMore = () => {
        setProducts((prev) => [...prev, ...data])
    }
    
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro</p>

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product: any, index: number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    )
}