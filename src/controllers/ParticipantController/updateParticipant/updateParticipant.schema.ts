import { schemaParticipant } from '@/models/Participant'
import { z } from 'zod'

export const schemaUpdateParticipant = schemaParticipant.omit({ id: true, active: true }).partial()

export type SchemaUpdateParticipant = z.infer<typeof schemaUpdateParticipant>
