import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'
import { SchemaRecoverPassword, schemaRecoverPassword } from './recoverPassword.schema'

export async function recoverPassword(args: SchemaRecoverPassword) {
  return await sendData({
    url: API_ROUTE.AUTH.PASSWORD_RECOVER,
    schema: schemaRecoverPassword,
    data: args,
  })
}
