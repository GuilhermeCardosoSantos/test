// query
import { useQuery } from "@tanstack/react-query"
// services
import { getProducts } from "@/services/product.service"
// axios type
import { AxiosError } from "axios"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 min cache

    retry: (failureCount, error: AxiosError) => {
      if (!error.response) return failureCount < 3
      return false
    },

    retryDelay: (attempt) =>
      Math.min(1000 * 2 ** attempt, 5000),
  })
}