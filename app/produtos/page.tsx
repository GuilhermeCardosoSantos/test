"use client"

// react
import { useEffect, useRef, useState } from "react"
// hooks
import { useProducts } from "@/hooks/useProducts"
import { useDebounce } from "@/hooks/useDebounce"
import { useProductFilters } from "@/hooks/useProductFilters"
// store
import { useFavoritesStore } from "@/store/favorite.store"
// components
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
// ui
import Button from "@/components/UI/button"
// type
import { Product } from "@/types/produtos"

export default function ProductsPage() {
    // state
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc">("name-asc")
    const [onlyFavorites, setOnlyFavorites] = useState(false)
    const [fakeError, setFakeError] = useState(true)
    const [products, setProducts] = useState<Product[]>([])
    // refs
    const isLoadingMore = useRef(false)
    const filteredRef = useRef<Product[]>([])
    // hooks
    const { data, isLoading, error } = useProducts()
    const { favorites, toggleFavorite } = useFavoritesStore()
    const debouncedSearch = useDebounce(search, 400)
    const filteredProducts = useProductFilters({
        products: data || [],
        search: debouncedSearch,
        favorites,
        sort,
        onlyFavorites,
    })
    // function
    const loadMore = () => {
        if (isLoadingMore.current) return

        isLoadingMore.current = true

        setProducts((prev) => [...prev, ...filteredRef.current])

        setTimeout(() => {
            isLoadingMore.current = false
        }, 300)
    }
    // effect
    useEffect(() => {
        filteredRef.current = filteredProducts
    }, [filteredProducts])
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProducts(filteredProducts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, sort, onlyFavorites, favorites, data])
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const fullHeight = document.documentElement.scrollHeight

            if (scrollTop + windowHeight >= fullHeight - 200) {
                loadMore()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    // loading
    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    // erro
    if (error || fakeError) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center w-full mt-5">

                <p className="text-xs sm:text-sm text-(--muted)">
                    Ocorreu um erro ao carregar os produtos.
                </p>

                <Button
                    onClick={() => {
                        if (fakeError) return setFakeError(false)
                        window.location.reload()
                    }}
                    className="w-full sm:w-auto  bg-primary text-white px-4 py-3 sm:py-2 rounded-md text-sm font-semibold transition active:scale-95 hover:opacity-90"
                >
                    Tentar novamente
                </Button>

            </div>
        )
    }

    return (
        <div className="w-full flex flex-col">

            <ProductFilters
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                onlyFavorites={onlyFavorites}
                setOnlyFavorites={setOnlyFavorites}
            />

            <ProductGrid
                products={products}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />

        </div>
    )
}