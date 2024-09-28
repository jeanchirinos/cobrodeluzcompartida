import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsDeleteParticipantFn = Pick<Participant, 'id'>

export async function deleteParticipant(args: ArgsDeleteParticipantFn) {
  return await sendData({
    url: API_ROUTE.PARTICIPANT.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
