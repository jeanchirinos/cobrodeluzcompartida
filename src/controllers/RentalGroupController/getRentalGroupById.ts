'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'

type ArgsGetRentalGroupByIdFn = {
  id: string | number
}

type ResponseGetRentalGroupById = RentalGroup | null

export async function getRentalGroupById(args: ArgsGetRentalGroupByIdFn) {
  const { id } = args

  const data = await getData<ResponseGetRentalGroupById>(API_ROUTE.RENTAL_GROUP.SHOW(id), {
    next: {
      tags: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
    },
  })

  return data
}
