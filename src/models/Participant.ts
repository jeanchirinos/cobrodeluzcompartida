import { z } from 'zod'

export const schemaParticipant = z.object({
  id: z.string(),
  alias: z.string(),
  key: z.string(),
  is_main: z.boolean(),
  avatar_url: z.string(),
})

export type Participant = z.infer<typeof schemaParticipant>
