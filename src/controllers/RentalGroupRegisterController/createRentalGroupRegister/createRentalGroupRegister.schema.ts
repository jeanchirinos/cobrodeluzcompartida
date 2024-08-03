import { z } from 'zod'
import { schemaBillData } from '@/models/BillData'
import { schemaRentalGroup } from '@/models/RentalGroup'
import { schemaResult } from '@/models/Result'

export const schemaCreateRentalGroupRegister = z.object({
  rental_group_id: schemaRentalGroup.shape.id,
  billData: schemaBillData.omit({ id: true, rental_group_id: true }).partial({ month: true, year: true, igv: true }),
  results: z.array(schemaResult.pick({ amount: true, consumption_kwh: true, tenant_id: true })),
})
