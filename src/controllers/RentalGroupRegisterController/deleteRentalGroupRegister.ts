'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsDeleteParticipantFn = Pick<BillData, 'id'>

export async function deleteRentalGroupRegister(args: ArgsDeleteParticipantFn) {
  return await sendData({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.DESTROY({ id: args.id }),
    config: {
      method: 'DELETE',
    },
    options: {
      revalidateTagParams: '/',
    },
  })
}
