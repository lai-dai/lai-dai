import { z } from 'zod'
import { loginAdminSchema } from './schema'

export type LoginAdminAttr = z.infer<typeof loginAdminSchema>
