// component
import { ProductCard } from "./product-card"
// type
import { Product } from "@/types/produtos"
type Props = {
    products: Product[]
    favorites: string[]
    onToggleFavorite: (id: string) => void
}

export function ProductGrid({
    products,
    favorites,
    onToggleFavorite,
}: Props) {
    if (!products || products.length === 0) {
        return (
            <div className="w-full text-center mt-10 text-(--muted)">
                <p>Nenhum produto encontrado.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product, index) => (
                <div data-testid="product-card" key={`${product.codigo}-${index}`}>
                    <ProductCard
                        key={product.codigo}
                        product={product}
                        isFavorite={favorites.includes(product.codigo)}
                        onToggleFavorite={() => onToggleFavorite(product.codigo)}
                    />
                </div>
            ))}
        </div>
    )
}