import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateParticipant>

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  return await sendData({
    url: API_ROUTE.PARTICIPANT.STORE,
    data: args,
    schema: schemaCreateParticipant,
  })
}
