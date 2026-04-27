"use client"

// hooks
import { useState } from "react"
// components
import { ProductModal } from "./product-modal"
// ui
import Button from "@/components/UI/button"
// type
import { Product } from "@/types/produtos"
// next
import Image from "next/image"

export function ProductCard({ product }: { product: Product }) {
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

    const colors = []

    for (let i = 0; i < 4; i++) {
      const index = Math.abs((hash + i) % baseColors.length)
      colors.push(baseColors[index])
    }

    return colors
  }

  return (
    <div className="bg-(--card) border border-(--border) rounded-md p-3 flex flex-col h-full">

      <div className="text-center">
        <h2 className="text-sm font-semibold text-foreground uppercase line-clamp-2 min-h-8">
          {product.nome}
        </h2>
        <p className="text-xs text-(--muted)">{product.codigo}</p>
      </div>

      <div className="relative border border-(--border) rounded p-2 flex items-center justify-center h-35">
        <span className="absolute top-1 right-1 text-[7px] text-blue-500 font-bold uppercase">
          EXCLUSIVO!
        </span>

        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          className="max-h-full object-contain"
        />
      </div>

      <div className="flex items-center gap-2 border border-(--border) rounded px-2 py-1 text-xs text-(--muted) mt-2">
        <div className="text-green-500">📦</div>
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
          {(generateColors(product.codigo)
          ).map((cor: string, i: number) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border"
              style={{ backgroundColor: cor }}
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
          className="bg-primary text-white cursor-pointer text-sm py-2 rounded w-full font-semibold hover:opacity-90 transition"
          onClick={() => setOpen(true)}
        >
          CONFIRA
        </Button>
        
        <ProductModal open={open} onClose={() => setOpen(false)}>
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
        </ProductModal>
      </div>
    </div>
  )
}