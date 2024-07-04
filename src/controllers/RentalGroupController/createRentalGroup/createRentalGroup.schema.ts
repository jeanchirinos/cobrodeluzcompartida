import { schemaRentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'

export const schemaCreateRentalGroup = schemaRentalGroup
  .pick({ name: true })
  .extend({
    n_participant: z.number(),
    return_tenants: z.boolean(),
  })
  .partial()
  .optional()
