'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

type ArgsDeleteParticipantFn = Pick<Participant, 'id'>

export async function deleteParticipant(args: ArgsDeleteParticipantFn) {
  return await sendDataAxios({
    url: API_ROUTE.PARTICIPANT.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
