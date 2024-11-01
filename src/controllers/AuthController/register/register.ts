import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'
import { schemaRegister, SchemaRegister } from './register.schema'

export async function register(args: SchemaRegister) {
  return await sendData({
    url: API_ROUTE.AUTH.REGISTER,
    schema: schemaRegister,
    data: args,
  })
}
