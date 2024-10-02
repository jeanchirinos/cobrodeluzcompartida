import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getData } from '@/utilities/request/getData/getData'

type ArgsGetParticipantByIdFn = Pick<Participant, 'id'>

export type ResponseGetParticipantById = Participant & {
  rental_group_id: RentalGroup['id']
}

export async function getParticipantById(args: ArgsGetParticipantByIdFn) {
  const { id } = args

  const participant = await getData<ResponseGetParticipantById>({
    url: API_ROUTE.PARTICIPANT.SHOW({ id }),
  })

  return participant
}
