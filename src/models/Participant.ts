import { z } from 'zod'

export const schemaParticipant = z.object({
  id: z.number(),
  alias: z.string().min(1),
  is_main: z.boolean(),
  active: z.boolean(),
})

export type Participant = z.infer<typeof schemaParticipant>
