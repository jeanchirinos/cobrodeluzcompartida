'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { createParticipantSchema } from './createParticipant.schema'

type ArgsCreateRentalGroupFn = { body: BodyCreateRentalGroup }

type BodyCreateRentalGroup = z.infer<typeof createParticipantSchema>

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  const data = await sendData<BodyCreateRentalGroup>({
    url: API_ROUTE.PARTICIPANT.STORE,
    body: args.body,
    schema: createParticipantSchema,
    revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX(args.body.rental_group_id)],
  })

  return data
}
