import { schemaParticipant } from '@/models/Participant'
import { schemaRentalGroup } from '@/models/RentalGroup'

export const schemaCreateParticipant = schemaParticipant
  .omit({ id: true, is_main: true })
  .partial()
  .extend({
    rental_group_id: schemaRentalGroup.shape.id,
  })
