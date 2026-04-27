"use client"
// hooks
import { useState } from "react"
// components
import { ProductModal } from "./product-modal"
// ui
import Button from "@/components/UI/button"
// next
import Image from "next/image"
// icon
import { Heart, HeartOff } from "lucide-react"
// type
import { Product } from "@/types/produtos"
type Props = {
  product: Product
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) {
  // state
  const [open, setOpen] = useState(false)
  // function
  const generateColors = (seed: string) => {
    const baseColors = [
      "#000000",
      "#ffffff",
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#f59e0b",
      "#8b5cf6",
      "#06b6d4",
    ]

    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }

    return Array.from({ length: 4 }).map((_, i) => {
      const index = Math.abs((hash + i) % baseColors.length)
      return baseColors[index]
    })
  }

  return (
    <div className="bg-(--card) border border-(--border) rounded-md p-3 flex flex-col h-full relative transition hover:shadow-md">

      <Button
        onClick={onToggleFavorite}
        className="absolute -top-3 -left-2 z-10 text-lg border border-(--border) bg-background rounded-full p-1 opacity-90 hover:opacity-100 transition"
        aria-label="Favoritar produto"
      >
        {isFavorite ? <Heart className="w-4 h-4 fill-red-500 text-red-500" /> : <HeartOff className="w-4 h-4" />}
      </Button>

      <div className="text-center">
        <h2 className="text-sm font-semibold text-foreground uppercase line-clamp-2 min-h-8">
          {product.nome}
        </h2>
        <p className="text-xs text-(--muted)">{product.codigo}</p>
      </div>

      <div className="relative border border-(--border) rounded p-2 flex items-center justify-center h-36 mt-1">
        <span className="absolute -top-4 sm:top-1 right-1 z-20 text-[7px] text-blue-500 font-bold uppercase">
          EXCLUSIVO!
        </span>

        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-2 border border-(--border) rounded px-2 py-1 text-xs text-(--muted) mt-2">
        <span className="text-green-500">📦</span>
        <span>com embalagem especial</span>
      </div>

      <p className="text-xs text-(--muted) text-left line-clamp-2 min-h-8 mt-2">
        {product.descricao}
      </p>

      <div className="mt-2">
        <span className="text-xs font-semibold text-foreground">
          Cores:
        </span>

        <div className="flex gap-1 flex-wrap mt-1">
          {generateColors(product.codigo).map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-(--border)"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">

        <div className="text-right">
          <p className="text-xs text-(--muted)">a partir de</p>

          <p className="text-lg font-bold text-foreground">
            R$ {Number(product.preco).toFixed(2)}
          </p>

          <p className="text-[10px] text-(--muted)">
            gerado pela melhor oferta
          </p>
        </div>

        <Button
          className="bg-primary text-white  text-sm py-2 rounded w-full font-semibold hover:opacity-90 transition"
          onClick={() => setOpen(true)}
        >
          CONFIRA
        </Button>


        {open && (
          <ProductModal open={open} onClose={() => setOpen(false)}>
            <div data-testid="product-modal">
              <h2 className="text-lg font-bold">{product.nome}</h2>

              <div className="relative w-full h-40">
                <Image
                  src={product.imagem}
                  alt={product.nome}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-sm text-(--muted)">
                {product.descricao}
              </p>

              <p className="font-bold text-lg">
                R$ {Number(product.preco).toFixed(2)}
              </p>
            </div>
          </ProductModal>
        )}
      </div>
    </div>
  )
}