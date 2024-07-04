import {
  schemaCalculateResults,
  schemaResponseCalculateResults,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { z } from 'zod'

export const schemaCookiesFormDataAndResults = schemaCalculateResults.pick({ billData: true }).extend({
  result: schemaResponseCalculateResults,
})

export type CookiesFormDataAndResults = z.infer<typeof schemaCookiesFormDataAndResults>
