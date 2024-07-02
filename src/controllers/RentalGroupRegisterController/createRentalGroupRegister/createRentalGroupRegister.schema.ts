import { z } from 'zod'
import { schemaCalculateResults } from '../calculateResults/calculateResults.schema'
import { schemaTenant } from '@/models/Tenant'

export const schemaCreateRentalGroupRegister = schemaCalculateResults
  .pick({
    billData: true,
  })
  .extend({
    consumptions: z.array(
      schemaTenant
        .pick({
          id: true,
        })
        .extend({
          consumption: z.coerce.number().positive(),
          amount: z.coerce.number().positive(),
        }),
    ),
  })
