import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsToggleActiveParticipantFn = Pick<Participant, 'id'>
type ResponseUpdateParticipant = Participant & { rental_group_id: RentalGroup['id'] }

export async function toggleActiveParticipant(args: ArgsToggleActiveParticipantFn) {
  const { id } = args

  return await sendData<ResponseUpdateParticipant>({
    url: API_ROUTE.PARTICIPANT.TOGGLE_ACTIVE({ participantId: id }),
    method: 'PATCH',
  })
}
