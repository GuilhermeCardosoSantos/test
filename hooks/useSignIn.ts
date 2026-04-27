// hooks
import { useMutation } from "@tanstack/react-query"
// service
import { SignIn } from "@/services/auth.service"
// axios type
import { AxiosError } from "axios"

export function useSignIn() {
  return useMutation({
    mutationFn: SignIn,

    retry: (failureCount, error: AxiosError) => {
      if (!error.response) return failureCount < 3
      return false
    },

    retryDelay: (attempt) =>
      Math.min(1000 * 2 ** attempt, 5000),
  })
}