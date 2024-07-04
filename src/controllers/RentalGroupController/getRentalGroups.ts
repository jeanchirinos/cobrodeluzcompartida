'use server'

import { Participant } from '@/models/Participant'
// import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
// import { getData } from '@/utilities/request/getData/getData'

type ResponseGetRentalGroups = Array<
  RentalGroup & {
    n_participant: number
    tenants: Array<
      Pick<Tenant, 'id' | 'alias' | 'avatar_url'> & {
        participant_id: Participant['id']
      }
    >
  }
>

export async function getRentalGroups() {
  // const data = await getData<ResponseGetRentalGroups>({
  //   url: API_ROUTE.RENTAL_GROUP.INDEX,
  //   mode: 'error-page',
  // })

  const data: ResponseGetRentalGroups = [
    {
      id: 1,
      name: 'Group 1',
      n_participant: 2,
      tenants: [
        {
          id: 1,
          participant_id: 1,
          alias: 'Tenant 1',
          avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
        },
        {
          id: 2,
          participant_id: 2,
          alias: 'Tenant 2',
          avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
        },
      ],
    },
  ]

  return data
}
