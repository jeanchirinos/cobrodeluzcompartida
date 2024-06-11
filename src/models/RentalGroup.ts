import { z } from 'zod'

export const schemaRentalGroup = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Ingresa un nombre válido' }),
})

export type RentalGroup = z.infer<typeof schemaRentalGroup>
