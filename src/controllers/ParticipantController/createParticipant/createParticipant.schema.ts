import { z } from 'zod'

export const createParticipantSchema = z.object({
  rental_group_id: z.number(),
  alias: z.string().optional(),
  key: z.string().optional(),
  avatar_url: z.string().optional(),
})
