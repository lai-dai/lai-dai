import {
  z,
} from "zod"

export const loginInputSchema = z.object({
  identifier: z.string().min(
    1, "Vui lòng nhập tên đăng nhập"
  ),
  password: z.string().min(
    1, "Vui lòng nhập mật khẩu"
  ),
})

export type LoginInput = z.infer<typeof loginInputSchema>

export interface LoginUser {
  id: number | string
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  token: string
}
