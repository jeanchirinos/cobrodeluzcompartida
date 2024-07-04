import { z } from 'zod'
import { schemaRentalGroup } from './RentalGroup'

export const schemaBillData = z.object({
  id: z.number(),
  rental_group_id: schemaRentalGroup.shape.id,
  consumption_kwh: z.coerce.number().positive(),
  kwh_price: z.coerce.number().positive(),
  current_month_total: z.coerce.number().positive(),
  igv: z.coerce.number().positive(),
  total: z.coerce.number().positive(),
  year: z.coerce.number(), // should be string ?
  month: z.coerce.number(), // should be string ?
})

export type BillData = z.infer<typeof schemaBillData>
