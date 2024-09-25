import { schemaRentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'

export const schemaUpdateRentalGroup = schemaRentalGroup.omit({ id: true })

export type SchemaUpdateRentalGroup = z.infer<typeof schemaUpdateRentalGroup>
