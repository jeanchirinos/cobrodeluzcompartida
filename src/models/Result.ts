import { z } from 'zod'
import { schemaBillData } from './BillData'
import { schemaTenant } from './Tenant'

export const schemaResult = z.object({
  id: z.number(),
  amount: z.coerce.number().nonnegative(),
  consumption_kwh: z.coerce.number().nonnegative(),
  meter_reading: z.coerce.number(),
  tenant_id: schemaTenant.shape.id,
  bill_data_id: schemaBillData.shape.id,
})

export type Result = z.infer<typeof schemaResult>
