import { z } from 'zod'

export const schemaLogin = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(8, { message: 'Debe tener al menos 8 caracteres' }),
})
