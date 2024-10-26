import { z } from 'zod'
import { schemaBillData } from './BillData'
import { schemaTenant } from './Tenant'

export const schemaResult = z.object({
  id: z.number().int().positive(),
  amount: z.number().nonnegative(),
  consumption_kwh: z.number().nonnegative(),
  meter_reading: z.number().nonnegative().optional(),
  tenant_id: schemaTenant.shape.id,
  bill_data_id: schemaBillData.shape.id,
})

export type Result = z.infer<typeof schemaResult>
