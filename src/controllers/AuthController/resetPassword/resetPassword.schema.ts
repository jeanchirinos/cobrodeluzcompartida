import { schemaUserBase } from '@/models/User'
import { z } from 'zod'

export const schemaResetPasswordBase = schemaUserBase.pick({ password: true }).merge(
  z.object({
    passwordConfirm: schemaUserBase.shape.password,
    token: z.string(),
  }),
)

export const schemaResetPassword = schemaResetPasswordBase.refine(data => data.password === data.passwordConfirm, {
  message: 'Las contraseñas no coinciden',
  path: ['passwordConfirm'],
})

export const schemaResetPasswordForm = schemaResetPasswordBase
  .omit({ token: true })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirm'],
  })

export type SchemaResetPassword = z.infer<typeof schemaResetPassword>
export type SchemaResetPasswordForm = z.infer<typeof schemaResetPasswordForm>
