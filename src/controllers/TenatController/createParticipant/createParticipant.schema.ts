import { schemaTenant } from '@/models/Tenant'
import { schemaParticipant } from '@/models/Participant'

export const schemaCreateTenant = schemaTenant.omit({ id: true, active: true }).partial().extend({
  light_meter_id: schemaParticipant.shape.id,
})
