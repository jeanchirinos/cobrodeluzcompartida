import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getData } from '@/utilities/request/getData/getData'

type ArgsGetRentalGroupByIdFn = Pick<RentalGroup, 'id'>

export type ResponseGetRentalGroupById = RentalGroup

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  return await getData<ResponseGetRentalGroupById>({
    url: API_ROUTE.RENTAL_GROUP.SHOW({ id: args.id }),
    mode: 'error-page',
  })
}
