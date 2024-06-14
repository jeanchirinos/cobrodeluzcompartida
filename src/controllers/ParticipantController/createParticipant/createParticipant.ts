'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateParticipant>

type BodyCreateParticipant = ArgsCreateRentalGroupFn

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  const data = await newSendData<BodyCreateParticipant>({
    url: API_ROUTE.PARTICIPANT.STORE,
    config: {
      body: args,
    },
    options: {
      schema: schemaCreateParticipant,
      revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId: args.rental_group_id })],
    },
  })

  return data
}
