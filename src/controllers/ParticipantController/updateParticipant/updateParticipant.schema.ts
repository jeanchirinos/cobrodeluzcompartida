import { schemaParticipant } from '@/models/Participant'

export const schemaUpdateParticipant = schemaParticipant.omit({ id: true, active: true }).partial()
