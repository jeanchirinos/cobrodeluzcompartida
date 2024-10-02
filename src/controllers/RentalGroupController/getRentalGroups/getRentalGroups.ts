import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
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
  const data = await getData<ResponseGetRentalGroups>({
    url: API_ROUTE.RENTAL_GROUP.INDEX,
  })

  return { rentalGroups: data }
}
