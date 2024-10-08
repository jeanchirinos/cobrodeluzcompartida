import {
  schemaCalculateResults,
  schemaResponseCalculateResults,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { z } from 'zod'

export const schemaCreateRentalGroupWithRegister = schemaCalculateResults.pick({ billData: true }).extend({
  results: schemaResponseCalculateResults,
})

export type SchemaCreateRentalGroupWithRegister = z.infer<typeof schemaCreateRentalGroupWithRegister>
