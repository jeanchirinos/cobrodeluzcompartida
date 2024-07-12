'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsDeleteRentalGroupFn = {
  id: RentalGroup['id']
}

export async function deleteRentalGroup(args: ArgsDeleteRentalGroupFn) {
  return await sendData({
    url: API_ROUTE.RENTAL_GROUP.DESTROY({ id: args.id }),
    config: {
      method: 'DELETE',
    },
    options: {
      revalidateTagParams: API_ROUTE.RENTAL_GROUP.INDEX,
    },
  })
}
