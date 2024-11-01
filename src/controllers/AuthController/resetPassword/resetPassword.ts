import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'
import { SchemaResetPassword, schemaResetPassword } from './resetPassword.schema'

export async function resetPassword(args: SchemaResetPassword) {
  return await sendData({
    url: API_ROUTE.AUTH.PASSWORD_RESET,
    schema: schemaResetPassword,
    data: args,
  })
}
