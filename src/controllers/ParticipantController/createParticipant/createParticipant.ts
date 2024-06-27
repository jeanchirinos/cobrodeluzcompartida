'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateParticipant>

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  const data = await sendData({
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
