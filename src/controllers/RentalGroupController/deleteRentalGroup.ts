'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { redirect } from 'next/navigation'

type ArgsDeleteRentalGroupFn = {
  id: string
}

export async function deleteRentalGroup(args: ArgsDeleteRentalGroupFn) {
  return sendData({
    url: API_ROUTE.RENTAL_GROUP.DESTROY(args.id),
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
    onSuccess() {
      redirect(ROUTE.GROUPS.INDEX)
    },
    method: 'DELETE',
  })
}
