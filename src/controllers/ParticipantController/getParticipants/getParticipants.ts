import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
import { getDataAxios } from '@/utilities/request/getData/getDataAxios'

type ArgsGetParticipantsFn = { rentalGroupId: RentalGroup['id'] }

export type ResponseGetParticipants = Array<
  Participant & { rental_group_id: RentalGroup['id'] } & {
    tenant: Pick<Tenant, 'id' | 'alias' | 'avatar_url'>
  }
>

export async function getParticipants(args: ArgsGetParticipantsFn) {
  const participants = await getDataAxios<ResponseGetParticipants>({
    url: API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId: args.rentalGroupId }),
  })

  return { participants }
}
