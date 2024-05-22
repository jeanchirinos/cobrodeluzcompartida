'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'

type Response = RentalGroup & { n_participant: string; participants: Omit<Participant, 'key'>[] }

export async function getRentalGroups() {
  const data = await getData<Response[]>(API_ROUTE.RENTAL_GROUP.INDEX, {
    cache: 'no-store',
    next: {
      tags: ['rental-groups'],
    },
    auth: true,
  })

  return data
}
