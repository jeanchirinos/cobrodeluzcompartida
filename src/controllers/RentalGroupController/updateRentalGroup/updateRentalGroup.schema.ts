import { schemaRentalGroup } from '@/models/RentalGroup'

export const schemaUpdateRentalGroup = schemaRentalGroup.omit({ id: true })
