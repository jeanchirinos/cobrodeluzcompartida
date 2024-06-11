'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'

type ArgsCreateRentalGroupFn = BodyCreateRentalGroup

type BodyCreateRentalGroup = z.infer<typeof schemaCreateParticipant>

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  const data = await sendData<BodyCreateRentalGroup>({
    url: API_ROUTE.PARTICIPANT.STORE,
    body: args,
    schema: schemaCreateParticipant,
    revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX(args.rental_group_id)],
  })

  return data
}
