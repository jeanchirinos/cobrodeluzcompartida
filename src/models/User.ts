import { z } from 'zod'

export const schemaUserBase = z.object({
  fullname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  image_url: z.string().min(1),
  token: z.string().min(1),
})

export const schemaUser = schemaUserBase.omit({ password: true })

export type UserBase = z.infer<typeof schemaUser>
export type User = z.infer<typeof schemaUser>
