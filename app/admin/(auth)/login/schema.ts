import { z } from 'zod'

export const loginAdminSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6, 'must be at least 6 characters long'),
})
