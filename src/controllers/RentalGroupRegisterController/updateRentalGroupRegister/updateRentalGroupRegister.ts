import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { sendData } from '@/utilities/request/sendData/sendData'
import { z } from 'zod'
import { schemaRentalGroupRegister } from './updateRentalGroupRegister.schema'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaRentalGroupRegister> & Pick<BillData, 'id'>

export async function updateRentalGroupRegister(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.UPDATE({ id }),
    data: restArgs,
    method: 'PUT',
    schema: schemaRentalGroupRegister,
  })
}
