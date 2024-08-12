import { z } from 'zod'
import { schemaCreateRentalGroupRegister } from '../createRentalGroupRegister/createRentalGroupRegister.schema'
import { schemaResult } from '@/models/Result'

export const schemaCalculateResults = z.object({
  billData: schemaCreateRentalGroupRegister.shape.billData.omit({
    igv: true,
    year: true,
    month: true,
    rental_group_id: true,
  }),
  consumptions: z.array(
    schemaCreateRentalGroupRegister.shape.results.element.pick({ consumption_kwh: true }),
    // .merge(schemaTenant.pick({ alias: true })),
  ),
})

export type CalculateResults = z.infer<typeof schemaCalculateResults>

export const schemaResponseCalculateResults = z.array(
  schemaResult.pick({ amount: true, consumption_kwh: true }),
  // .extend({
  //   participant: schemaParticipant.pick({ is_main: true }),
  //   tenant: schemaTenant.pick({ id: true, alias: true }),
  // }),
)

// Add

export const schemaCalculateResultsAdd = z.object({
  billData: schemaCreateRentalGroupRegister.shape.billData.omit({
    igv: true,
    rental_group_id: true,
  }),
  consumptions: z.array(
    schemaCreateRentalGroupRegister.shape.results.element.pick({ consumption_kwh: true }),
    // .merge(schemaTenant.pick({ alias: true })),
  ),
})

export type CalculateResultsAdd = z.infer<typeof schemaCalculateResultsAdd>
