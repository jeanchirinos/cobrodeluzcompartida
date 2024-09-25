'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

type ArgsDeleteRentalGroupFn = Pick<RentalGroup, 'id'>

export async function deleteRentalGroup(args: ArgsDeleteRentalGroupFn) {
  return await sendDataAxios({
    url: API_ROUTE.RENTAL_GROUP.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
