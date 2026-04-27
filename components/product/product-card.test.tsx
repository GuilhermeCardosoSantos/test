import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { ProductCard } from "./product-card"
import { Product } from "@/types/produtos"

// mock
vi.mock("next/image", () => ({
    default: (props: { src: string; alt: string; fill: boolean; className: string }) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                {...props}
                alt={props.alt || ""}
            />
        )
    },
}))
vi.mock("./product-modal", () => ({
    ProductModal: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
        open ? <div>{children}</div> : null,
}))
const mockProduct: Product = {
    nome: "Produto Teste",
    codigo: "123",
    preco: 10,
    descricao: "Descrição teste",
    imagem: "/img.jpg",
    codigo_categoria: "cat-1",
    referencia: "ref-1",
}

describe("ProductCard", () => {

    it("renderiza dados do produto", () => {
        render(
            <ProductCard
                product={mockProduct}
                isFavorite={false}
                onToggleFavorite={() => { }}
            />
        )
        // checks
        expect(screen.getByText("Produto Teste")).toBeInTheDocument()
        expect(screen.getByText("123")).toBeInTheDocument()
        expect(screen.getByText("R$ 10.00")).toBeInTheDocument()
    })

    it("chama função ao clicar em favorito", () => {
        const fn = vi.fn()
        render(
            <ProductCard
                product={mockProduct}
                isFavorite={false}
                onToggleFavorite={fn}
            />
        )
        // click
        fireEvent.click(screen.getByLabelText("Favoritar produto"))
        // check
        expect(fn).toHaveBeenCalled()
    })

    it("abre modal ao clicar em CONFIRA", async () => {
        render(
            <ProductCard
                product={mockProduct}
                isFavorite={false}
                onToggleFavorite={() => { }}
            />
        )

        // modal not exists
        expect(screen.queryByTestId("product-modal")).not.toBeInTheDocument()

        // click
        fireEvent.click(screen.getByText("CONFIRA"))

        // modal exists
        expect(await screen.findByTestId("product-modal")).toBeInTheDocument()
    })
})