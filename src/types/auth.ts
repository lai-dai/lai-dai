import { z } from "zod"

export const loginInputSchema = z.object({
  identifier: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
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

  firstname: string
  lastname: string
  isActive: true
  preferedLanguage: null
  locale: null
}

export const adminLoginSchema = z.object({
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>
