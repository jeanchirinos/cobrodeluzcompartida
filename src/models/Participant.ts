import { z } from 'zod'

export const schemaParticipant = z.object({
  id: z.number(),
  alias: z.string().min(1),
  is_main: z.boolean(),
  active: z.boolean(), // TODO: Backend
  // key: z.string().min(1),
  // avatar_url: z.string().min(1),
})

export type Participant = z.infer<typeof schemaParticipant>
