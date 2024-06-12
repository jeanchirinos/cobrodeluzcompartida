'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { newGetData } from '@/utilities/getData/getData'

type ResponseGetRentalGroups = (RentalGroup & {
  n_participant: string
  participants: Omit<Participant, 'key'>[]
})[]

export async function getRentalGroups() {
  const data = await newGetData<ResponseGetRentalGroups>({
    url: API_ROUTE.RENTAL_GROUP.INDEX,
    config: {
      next: {
        tags: [API_ROUTE.RENTAL_GROUP.INDEX],
      },
    },
  })

  return data
}
