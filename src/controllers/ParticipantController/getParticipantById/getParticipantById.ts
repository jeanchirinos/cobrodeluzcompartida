import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getDataAxios } from '@/utilities/request/getData/getDataAxios'

type ArgsGetParticipantByIdFn = Pick<Participant, 'id'>

type ResponseGetParticipantById = Participant & {
  rental_group_id: RentalGroup['id']
}

export async function getParticipantById(args: ArgsGetParticipantByIdFn) {
  const { id } = args

  const participant = await getDataAxios<ResponseGetParticipantById>({
    url: API_ROUTE.PARTICIPANT.SHOW({ id }),
  })

  return { participant }
}
