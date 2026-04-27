import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/services/product.service"
import axios from "axios"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 min cache

    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        // erro de rede (sem resposta)
        if (!error.response) return failureCount < 3
      }

      return false
    },

    retryDelay: (attempt) =>
      Math.min(1000 * 2 ** attempt, 5000),
  })
}