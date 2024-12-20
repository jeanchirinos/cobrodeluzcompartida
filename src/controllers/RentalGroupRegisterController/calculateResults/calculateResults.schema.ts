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
  consumptions: z.array(schemaCreateRentalGroupRegister.shape.results.element.pick({ consumption_kwh: true })),
})

export type CalculateResults = z.infer<typeof schemaCalculateResults>

export const schemaResponseCalculateResults = z.array(schemaResult.pick({ amount: true, consumption_kwh: true }))

// Add
export const schemaCalculateResultsAdd = z.object({
  billData: schemaCreateRentalGroupRegister.shape.billData.omit({
    igv: true,
    rental_group_id: true,
  }),
  consumptions: z.array(
    schemaCreateRentalGroupRegister.shape.results.element.pick({ consumption_kwh: true, meter_reading: true }),
  ),
})

export type SchemaCalculateResultsAdd = z.infer<typeof schemaCalculateResultsAdd>
