import type { Metadata } from "next"
import ProductsLayoutClient from "./layout-client"

export const metadata: Metadata = {
    title: "Produtos",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ProductsLayoutClient>{children}</ProductsLayoutClient>
}