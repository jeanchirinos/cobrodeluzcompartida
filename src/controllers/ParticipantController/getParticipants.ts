'use server'

// import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
// import { getData } from '@/utilities/request/getData/getData'

type ArgsGetParticipantsFn = { rentalGroupId: RentalGroup['id'] }

export type ResponseGetParticipants = Array<
  Participant & { rental_group_id: RentalGroup['id'] } & {
    tenant: Pick<Tenant, 'id' | 'alias' | 'avatar_url'>
  }
>

export async function getParticipants(args: ArgsGetParticipantsFn) {
  // const participants = await getData<ResponseGetParticipants>({
  //   url: API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId: args.rentalGroupId }),
  // })

  const participants: ResponseGetParticipants = [
    {
      id: 1,
      active: true,
      alias: 'Participant 1',
      is_main: true,
      rental_group_id: 1,
      tenant: {
        id: 1,
        alias: 'Tenant 1',
        avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
      },
    },
    {
      id: 2,
      active: true,
      alias: 'Participant 2',
      is_main: false,
      rental_group_id: 1,
      tenant: {
        id: 2,
        alias: 'Tenant 2',
        avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
      },
    },
    {
      id: 3,
      active: false,
      alias: 'Participant 3',
      is_main: false,
      rental_group_id: 1,
      tenant: {
        id: 3,
        alias: 'Tenant 3',
        avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
      },
    },
  ]

  return { participants }
}
