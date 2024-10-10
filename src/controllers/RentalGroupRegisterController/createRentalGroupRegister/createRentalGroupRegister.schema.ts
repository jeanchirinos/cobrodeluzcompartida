import { z } from 'zod'
import { schemaBillData } from '@/models/BillData'
import { schemaResult } from '@/models/Result'

export const schemaCreateRentalGroupRegister = z.object({
  billData: schemaBillData.omit({ id: true }),
  results: z.array(
    schemaResult
      .pick({ amount: true, consumption_kwh: true, tenant_id: true, meter_reading: true })
      .partial({ meter_reading: true }),
  ),
})

export type SchemaCreateRentalGroupRegister = z.infer<typeof schemaCreateRentalGroupRegister>
