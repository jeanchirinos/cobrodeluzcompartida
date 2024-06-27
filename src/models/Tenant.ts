import { z } from 'zod'

export const schemaTenant = z.object({
  id: z.number(),
  alias: z.string().min(1),
  key: z.string().min(1),
  active: z.boolean(),
  avatar_url: z.string().min(1),
})

export type Tenant = z.infer<typeof schemaTenant>
