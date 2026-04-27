import { api } from "@/lib/api"

export async function getProducts() {
  const { data } = await api.get("/produtos/listar")
  return data
}