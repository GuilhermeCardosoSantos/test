
// type
import { Product } from "@/types/produtos"
type Params = {
    products: Product[]
    search: string
    favorites: string[]
    sort: "price-asc" | "price-desc" | "name-asc" | "name-desc"
    onlyFavorites: boolean
}

export function useProductFilters({
    products,
    search,
    favorites,
    sort,
    onlyFavorites,
}: Params) {
    if (!products) return []

    let list = [...products]

    if (search) {
        const s = search.toLowerCase()

        list = list.filter(
            (p) =>
                p.nome.toLowerCase().includes(s) ||
                p.codigo.includes(search)
        )
    }

    if (onlyFavorites) {
        list = list.filter((p) => favorites.includes(p.codigo))
    }

    switch (sort) {
        case "price-asc":
            list.sort((a, b) => a.preco - b.preco)
            break
        case "price-desc":
            list.sort((a, b) => b.preco - a.preco)
            break
        case "name-asc":
            list.sort((a, b) => a.nome.localeCompare(b.nome))
            break
        case "name-desc":
            list.sort((a, b) => b.nome.localeCompare(a.nome))
            break
    }

    return list
}