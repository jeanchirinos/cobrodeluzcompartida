'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'

type ArgsDeleteRentalGroupFn = {
  id: RentalGroup['id']
}

export async function deleteRentalGroup(args: ArgsDeleteRentalGroupFn) {
  return sendData({
    url: API_ROUTE.RENTAL_GROUP.DESTROY(args.id),
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
    method: 'DELETE',
  })
}
