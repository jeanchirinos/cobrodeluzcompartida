'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

type ArgsToggleActiveParticipantFn = Pick<Participant, 'id'>

export async function toggleActiveParticipant(args: ArgsToggleActiveParticipantFn) {
  const { id } = args

  return await sendDataAxios({
    url: API_ROUTE.PARTICIPANT.TOGGLE_ACTIVE({ participantId: id }),
    method: 'PATCH',
  })
}
