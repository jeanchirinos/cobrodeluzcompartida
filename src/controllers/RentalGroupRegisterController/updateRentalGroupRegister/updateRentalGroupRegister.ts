import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { sendData } from '@/utilities/request/sendData/sendData'
import { SchemaRentalGroupRegister, schemaRentalGroupRegister } from './updateRentalGroupRegister.schema'

type ArgsUpdateRentalGroupFn = SchemaRentalGroupRegister & Pick<BillData, 'id'>

export async function updateRentalGroupRegister(args: ArgsUpdateRentalGroupFn) {
  const { id, ...data } = args

  return await sendData({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.UPDATE({ id }),
    data,
    method: 'PUT',
    schema: schemaRentalGroupRegister,
  })
}
