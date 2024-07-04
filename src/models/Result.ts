import { z } from 'zod'
import { schemaBillData } from './BillData'
import { schemaTenant } from './Tenant'

export const schemaResult = z.object({
  id: z.number(),
  amount: z.coerce.number().positive(),
  consumption_kwh: z.coerce.number().positive(),
  tenant_id: schemaTenant.shape.id,
  bill_id: schemaBillData.shape.id,
})

export type Result = z.infer<typeof schemaResult>
