"use client"

import { useState } from "react"
import { ProductModal } from "./product-modal"

export function ProductCard({ product }: any) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-md p-3 flex flex-col h-full">

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-sm font-semibold text-[var(--foreground)] uppercase line-clamp-2 min-h-[32px]">
          {product.nome}
        </h2>
        <p className="text-xs text-[var(--muted)]">{product.codigo}</p>
      </div>

      {/* IMAGE */}
      <div className="relative border border-[var(--border)] rounded p-2 flex items-center justify-center h-[140px]">
        <span className="absolute top-1 right-1 text-[10px] text-blue-500 font-semibold">
          EXCLUSIVO!
        </span>

        <img
          src={product.imagem}
          alt={product.nome}
          className="max-h-full object-contain"
        />
      </div>

      {/* EMBALAGEM */}
      <div className="flex items-center gap-2 border border-[var(--border)] rounded px-2 py-1 text-xs text-[var(--muted)] mt-2">
        <div className="text-green-500">📦</div>
        <span>com embalagem especial</span>
      </div>

      {/* DESCRIÇÃO */}
      <p className="text-xs text-[var(--muted)] text-left line-clamp-2 min-h-[32px] mt-2">
        {product.descricao}
      </p>

      {/* CORES */}
      <div className="mt-2">
        <span className="text-xs font-semibold text-[var(--foreground)]">
          Cores:
        </span>

        <div className="flex gap-1 flex-wrap mt-1">
          {(product.cores || []).map((cor: string, i: number) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border"
              style={{ backgroundColor: cor }}
            />
          ))}
        </div>
      </div>

      {/* 👇 BLOCO FIXO EMBAIXO */}
      <div className="mt-auto flex flex-col gap-2">

        {/* PREÇO */}
        <div className="text-right">
          <p className="text-xs text-[var(--muted)]">a partir de</p>

          <p className="text-lg font-bold text-[var(--foreground)]">
            R$ {Number(product.preco).toFixed(2)}
          </p>

          <p className="text-[10px] text-[var(--muted)]">
            gerado pela melhor oferta
          </p>
        </div>

        {/* BOTÃO */}
        <button
          className="bg-primary text-white text-sm py-2 rounded w-full font-semibold hover:opacity-90 transition"
          onClick={() => setOpen(true)}
        >
          CONFIRA
        </button>
        <ProductModal open={open} onClose={() => setOpen(false)}>
          <h2 className="text-lg font-bold">{product.nome}</h2>

          <img
            src={product.imagem}
            alt={product.nome}
            className="w-full h-40 object-contain"
          />

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