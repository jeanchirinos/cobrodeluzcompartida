import { z } from 'zod'
import { schemaCreateRentalGroupRegister } from '../createRentalGroupRegister/createRentalGroupRegister.schema'

export const schemaRentalGroupRegister = schemaCreateRentalGroupRegister.partial()

export type SchemaRentalGroupRegister = z.infer<typeof schemaRentalGroupRegister>
