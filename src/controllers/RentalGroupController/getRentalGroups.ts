'use server'

// import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
// import { getData } from '@/utilities/request/getData/getData'

type ResponseGetRentalGroups = Array<
  RentalGroup & {
    n_participant: number
    // participants: Array<Omit<Participant, 'key'>>
    tenants: Array<Omit<Tenant, 'key' | 'active'>> // TODO : Backend
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
      n_participant: 2,
      name: 'Group 1',
      tenants: [
        {
          id: 1,
          alias: 'Tenant 1',
          avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
        },
        {
          id: 2,
          alias: 'Tenant 2',
          avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
        },
      ],
    },
  ]

  return data
}
