import { z } from 'zod'

export const schemaCalculateResults = z.object({
  billData: z.object({
    consumption_kwh: z.coerce.number().positive(),
    kwh_price: z.coerce.number().positive(),
    current_month_total: z.coerce.number().positive(),
    total: z.coerce.number().positive(),
  }),
  consumptions: z.array(
    z.object({
      consumption: z.coerce.number().positive(),
      alias: z.string(),
    }),
  ),
})
