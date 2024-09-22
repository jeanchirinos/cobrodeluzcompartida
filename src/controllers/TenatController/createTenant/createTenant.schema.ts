import { schemaTenant } from '@/models/Tenant'
import { schemaParticipant } from '@/models/Participant'
import { z } from 'zod'

export const schemaCreateTenant = schemaTenant.omit({ id: true, active: true, key: true }).partial().extend({
  participant_id: schemaParticipant.shape.id,
})

export type SchemaCreateTenant = z.infer<typeof schemaCreateTenant>
