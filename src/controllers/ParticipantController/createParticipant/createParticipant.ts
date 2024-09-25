'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateParticipant>

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  return await sendDataAxios({
    url: API_ROUTE.PARTICIPANT.STORE,
    data: args,
    schema: schemaCreateParticipant,
  })
}
