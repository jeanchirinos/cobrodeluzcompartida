import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'
import { SchemaCreateTenant, schemaCreateTenant } from './createTenant.schema'

export async function createTenant(args: SchemaCreateTenant) {
  return await sendData({
    url: API_ROUTE.TENANT.STORE,
    data: args,
    schema: schemaCreateTenant,
  })
}
