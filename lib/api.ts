import axios from "axios"
// base
import { API_BASE } from "./config"

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
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)