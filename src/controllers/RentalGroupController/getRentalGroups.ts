'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { newGetData } from '@/utilities/request/getData/getData'

type ResponseGetRentalGroups = (RentalGroup & {
  n_participant: number
  participants: Omit<Participant, 'key'>[]
})[]

export async function getRentalGroups() {
  const data = await newGetData<ResponseGetRentalGroups>({
    url: API_ROUTE.RENTAL_GROUP.INDEX,
    mode: 'error-page',
  })

  return data
}
