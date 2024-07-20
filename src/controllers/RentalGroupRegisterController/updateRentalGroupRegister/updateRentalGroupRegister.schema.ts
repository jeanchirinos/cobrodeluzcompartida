import { schemaCreateRentalGroupRegister } from '../createRentalGroupRegister/createRentalGroupRegister.schema'

export const schemaRentalGroupRegister = schemaCreateRentalGroupRegister.omit({ rental_group_id: true }).partial()
