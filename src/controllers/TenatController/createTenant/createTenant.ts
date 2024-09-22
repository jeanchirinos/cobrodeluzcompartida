'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'
import { SchemaCreateTenant, schemaCreateTenant } from './createTenant.schema'

export async function createTenant(args: SchemaCreateTenant) {
  return await sendDataAxios({
    url: API_ROUTE.TENANT.STORE,
    data: args,
    schema: schemaCreateTenant,
  })
}
