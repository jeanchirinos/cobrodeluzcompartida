import { z } from 'zod'
import { schemaCreateRentalGroupRegister } from '../createRentalGroupRegister/createRentalGroupRegister.schema'
import { schemaParticipant } from '@/models/Participant'
import { schemaTenant } from '@/models/Tenant'
import { schemaResult } from '@/models/Result'

export const schemaCalculateResults = z.object({
  billData: schemaCreateRentalGroupRegister.shape.billData.partial({ igv: true }),
  consumptions: z.array(
    schemaCreateRentalGroupRegister.shape.results.element
      .pick({ consumption_kwh: true })
      .merge(schemaTenant.pick({ alias: true })),
  ),
})

export type CalculateResults = z.infer<typeof schemaCalculateResults>

export const schemaResponseCalculateResults = z.array(
  schemaResult.pick({ amount: true, consumption_kwh: true }).extend({
    participant: schemaParticipant.pick({ is_main: true }),
    tenant: schemaTenant.pick({ id: true, alias: true }),
  }),
)

// Add

export const schemaCalculateResultsAdd = z.object({
  billData: schemaCreateRentalGroupRegister.shape.billData.partial({ igv: true }),
  consumptions: z.array(
    schemaCreateRentalGroupRegister.shape.results.element
      .pick({ consumption_kwh: true, tenant_id: true })
      .merge(schemaTenant.pick({ alias: true })),
  ),
})

export type CalculateResultsAdd = z.infer<typeof schemaCalculateResultsAdd>
