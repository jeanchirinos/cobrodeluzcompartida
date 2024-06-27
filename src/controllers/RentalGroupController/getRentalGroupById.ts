import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getData } from '@/utilities/request/getData/getData'

type ArgsGetRentalGroupByIdFn = {
  id: RentalGroup['id']
}

type ResponseGetRentalGroupById = RentalGroup

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  const { id } = args

  // const rentalGroup = await getData<ResponseGetRentalGroupById>({
  //   url: API_ROUTE.RENTAL_GROUP.SHOW({ id }),
  //   mode: 'error-page',
  // })

  const rentalGroup: ResponseGetRentalGroupById = {
    id: 1,
    name: 'Group 1',
  }

  return { rentalGroup }
}
