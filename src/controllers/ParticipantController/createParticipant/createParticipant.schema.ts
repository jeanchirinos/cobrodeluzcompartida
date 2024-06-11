import { schemaParticipant } from '@/models/Participant'

export const schemaCreateParticipant = schemaParticipant
  .omit({ id: true, is_main: true })
  .partial()
  .extend({
    rental_group_id: schemaParticipant.shape.id,
  })
