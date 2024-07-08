import { schemaTenant } from '@/models/Tenant'
import { schemaParticipant } from '@/models/Participant'

export const schemaCreateTenant = schemaTenant.omit({ id: true, active: true, key: true }).partial().extend({
  participant_id: schemaParticipant.shape.id,
})
