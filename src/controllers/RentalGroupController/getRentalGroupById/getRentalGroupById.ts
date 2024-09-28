import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getDataAxios } from '@/utilities/request/getData/getDataAxios'

type ArgsGetRentalGroupByIdFn = Pick<RentalGroup, 'id'>

export type ResponseGetRentalGroupById = RentalGroup

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  return await getDataAxios<ResponseGetRentalGroupById>({
    url: API_ROUTE.RENTAL_GROUP.SHOW({ id: args.id }),
    // mode: 'error-page',
  })
}
