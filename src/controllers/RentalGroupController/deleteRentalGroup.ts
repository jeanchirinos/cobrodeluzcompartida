'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/actionRequest'

type Args = {
  id: string
}

export async function deleteRentalGroup(args: Args) {
  return sendData({
    url: API_ROUTE.RENTAL_GROUP.DESTROY(args.id),
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
  })
}
