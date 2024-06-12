'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateParticipant>

type BodyCreateParticipant = ArgsCreateRentalGroupFn

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  const data = await sendData<BodyCreateParticipant>({
    url: API_ROUTE.PARTICIPANT.STORE,
    body: args,
    schema: schemaCreateParticipant,
    revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId: args.rental_group_id })],
  })

  return data
}
