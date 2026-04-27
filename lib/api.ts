import axios from "axios"
// base
import { API_BASE } from "./config"
// store
import { useAuthStore } from "@/store/auth.store"

export const api = axios.create({
    baseURL: API_BASE
})

function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()
  }

  return null
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getCookie("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // clear user state and cookies
      const logout = useAuthStore.getState().logout
      logout()
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
      window.location.href = "/auth/sign-in"
    }

    return Promise.reject(error)
  }
)