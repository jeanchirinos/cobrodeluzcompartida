import { schemaUserBase } from '@/models/User'
import { z } from 'zod'

export const schemaRegister = schemaUserBase
  .pick({ email: true, password: true })
  .and(
    z.object({
      passwordConfirm: schemaUserBase.shape.password,
    }),
  )
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirm'],
  })

export type SchemaRegister = z.infer<typeof schemaRegister>
