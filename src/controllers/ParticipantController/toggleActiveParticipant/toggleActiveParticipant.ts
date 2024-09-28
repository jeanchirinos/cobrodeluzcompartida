import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsToggleActiveParticipantFn = Pick<Participant, 'id'>

export async function toggleActiveParticipant(args: ArgsToggleActiveParticipantFn) {
  const { id } = args

  return await sendData({
    url: API_ROUTE.PARTICIPANT.TOGGLE_ACTIVE({ participantId: id }),
    method: 'PATCH',
  })
}
