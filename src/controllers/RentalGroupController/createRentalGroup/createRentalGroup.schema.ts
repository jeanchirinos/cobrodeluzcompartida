import { schemaRentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'

export const schemaCreateRentalGroup = schemaRentalGroup
  .pick({ name: true })
  .extend({
    n_participant: z.number(),
    return_participants: z.boolean(),
  })
  .partial()
  .optional()
