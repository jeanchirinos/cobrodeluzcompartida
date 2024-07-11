import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getData } from '@/utilities/request/getData/getData'
// import { waitFor } from '@/utilities/utilities'

type ArgsGetRentalGroupByIdFn = {
  id: RentalGroup['id']
}

export type ResponseGetRentalGroupById = RentalGroup

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  const { id } = args

  // await waitFor(5)

  const rentalGroup = await getData<ResponseGetRentalGroupById>({
    url: API_ROUTE.RENTAL_GROUP.SHOW({ id }),
    mode: 'error-page',
  })

  return { rentalGroup }
}

export type ReturnGetRentalGroupById = Awaited<ReturnType<typeof getRentalGroupById>>
