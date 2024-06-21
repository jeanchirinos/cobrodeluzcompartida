import { z } from 'zod'

export const schemaParticipant = z.object({
  id: z.number(),
  alias: z.string().min(1),
  key: z.string().min(1),
  is_main: z.boolean(),
  avatar_url: z.string().min(1),
})

export type Participant = z.infer<typeof schemaParticipant>
