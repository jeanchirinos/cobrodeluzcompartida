'use server'

import { Participant } from '@/models/Participant'
import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
import { getData } from '@/utilities/request/getData/getData'

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
  const rentalGroups = await getData<ResponseGetRentalGroups>({
    url: API_ROUTE.RENTAL_GROUP.INDEX,
    mode: 'error-page', // TODO: Why is this needed?
  })

  return { rentalGroups }
}
