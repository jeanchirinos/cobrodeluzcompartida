import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'
import { API_ROUTE } from '@/constants/api-routes'

type ArgsGetRentalGroupByIdFn = {
  id: RentalGroup['id']
}

type ResponseGetRentalGroupById = RentalGroup

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  const { id } = args

  const rentalGroup = await getData<ResponseGetRentalGroupById>(API_ROUTE.RENTAL_GROUP.SHOW(id), {
    next: {
      tags: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
    },
  })

  return { rentalGroup }
}

// TODO: Should it be nullable?
