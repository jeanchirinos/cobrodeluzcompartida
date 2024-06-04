import { z } from 'zod'

export const schemaUpdateRentalGroup = z.object({
  name: z.string().min(1, { message: 'Ingresa un nombre válido' }),
})
