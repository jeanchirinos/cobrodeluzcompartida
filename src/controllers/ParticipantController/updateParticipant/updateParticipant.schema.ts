import { schemaParticipant } from '@/models/Participant'
import { z } from 'zod'

export const schemaUpdateParticipant = schemaParticipant
  .omit({ id: true, key: true, is_main: true })
  .partial()
