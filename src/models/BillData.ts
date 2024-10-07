import { z } from 'zod'
import { schemaRentalGroup } from './RentalGroup'

export const schemaBillData = z.object({
  id: z.number().int().positive(),
  rental_group_id: schemaRentalGroup.shape.id,
  // consumption_kwh: z.coerce.number().nonnegative(),
  consumption_kwh: z.number().nonnegative(),
  // kwh_price: z.coerce.number().nonnegative(),
  kwh_price: z.number().nonnegative(),
  // current_month_total: z.coerce.number().positive(),
  current_month_total: z.number().positive(),
  // igv: z.coerce.number().positive(),
  igv: z.number().positive(),
  // total: z.coerce.number().positive(),
  total: z.number().positive(),
  // year: z.coerce.number().positive().int(),
  year: z.number().positive().int(),
  // month: z.coerce.number().int().min(1).max(12),
  month: z.number().int().min(1).max(12),
})

export type BillData = z.infer<typeof schemaBillData>
