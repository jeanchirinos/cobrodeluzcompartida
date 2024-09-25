'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

type ArgsDeleteParticipantFn = Pick<BillData, 'id'>

export async function deleteRentalGroupRegister(args: ArgsDeleteParticipantFn) {
  return await sendDataAxios({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
