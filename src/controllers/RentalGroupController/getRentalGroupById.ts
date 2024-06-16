import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { newGetData } from '@/utilities/request/getData/getData'

type ArgsGetRentalGroupByIdFn = {
  id: RentalGroup['id']
}

type ResponseGetRentalGroupById = RentalGroup

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  const { id } = args

  const rentalGroup = await newGetData<ResponseGetRentalGroupById>({
    url: API_ROUTE.RENTAL_GROUP.SHOW({ id }),
    config: {
      next: {
        tags: [API_ROUTE.RENTAL_GROUP.SHOW({ id })],
      },
    },
    mode: 'error-page',
  })

  return { rentalGroup }
}
