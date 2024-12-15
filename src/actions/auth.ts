import {
  apiPublic,
} from "~/lib/api"

import {
  type AuthResponse,
} from "~/types/api"
import {
  type LoginInput, type LoginUser,
} from "~/types/auth"

export const login = async (data: LoginInput) => {
  const response = await apiPublic.post<AuthResponse<LoginUser>>(
    "/api/auth/local",
    data,
  )

  return response
}
