import { schemaParticipant } from '@/models/Participant'

export const schemaUpdateParticipant = schemaParticipant
  .omit({ id: true, key: true, is_main: true })
  .partial()
