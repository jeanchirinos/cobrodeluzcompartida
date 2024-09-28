import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsDeleteRentalGroupFn = Pick<RentalGroup, 'id'>

export async function deleteRentalGroup(args: ArgsDeleteRentalGroupFn) {
  return await sendData({
    url: API_ROUTE.RENTAL_GROUP.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
