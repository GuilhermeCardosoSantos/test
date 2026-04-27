"use client"

// ui
import Button from "@/components/UI/button"
import Input from "@/components/UI/input"
// type
type Props = {
    // search
    search: string
    setSearch: (v: string) => void
    // sort
    sort: "price-asc" | "price-desc" | "name-asc" | "name-desc"
    setSort: (v: "price-asc" | "price-desc" | "name-asc" | "name-desc") => void
    // favorites
    onlyFavorites: boolean
    setOnlyFavorites: (v: boolean) => void
}

export function ProductFilters({
    search,
    setSearch,
    sort,
    setSort,
    onlyFavorites,
    setOnlyFavorites,
}: Props) {
    return (
        <div className="w-full flex flex-col sm:flex-row gap-2 mb-4">

            <Input
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-(--border) bg-background px-3 py-2 rounded w-full text-sm"
            />

            <Button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className="px-3 py-2 text-sm  border border-(--border) rounded bg-background"
            >
                {onlyFavorites ? "Todos" : "Favoritos"}
            </Button>


            <select
                value={sort}
                onChange={(e) => setSort((e.target.value) as "price-asc" | "price-desc" | "name-asc" | "name-desc")}
                className="border  border-(--border) bg-background px-2 py-2 rounded text-sm"
            >
                <option value="name-asc">Nome A-Z</option>
                <option value="name-desc">Nome Z-A</option>
                <option value="price-desc">Preço ↑</option>
                <option value="price-asc">Preço ↓</option>
            </select>

        </div>
    )
}