// useSignIn.ts
import { useMutation } from "@tanstack/react-query"
import { SignIn } from "@/services/auth.service"

export function useSignIn() {
  return useMutation({
    mutationFn: SignIn,

    retry: (failureCount, error: any) => {
      if (!error.response) return failureCount < 3
      return false
    },

    retryDelay: (attempt) =>
      Math.min(1000 * 2 ** attempt, 5000),
  })
}