'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'

type ResponseGetRentalGroups = (RentalGroup & {
  n_participant: string
  participants: Omit<Participant, 'key'>[]
})[]

export async function getRentalGroups() {
  const data = await getData<ResponseGetRentalGroups>(API_ROUTE.RENTAL_GROUP.INDEX, {
    cache: 'no-store',
    next: {
      tags: [API_ROUTE.RENTAL_GROUP.INDEX],
    },
    auth: true,
  })

  return data
}
