import { api } from "@/lib/api"

export const SignIn = async (data: {
  email: string
  senha: string
}) => {
  const res = await api.post("/login/acessar", data)
  return res.data
}
