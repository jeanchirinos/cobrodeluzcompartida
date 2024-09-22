'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Tenant } from '@/models/Tenant'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

type ArgsDeleteTenantFn = Pick<Tenant, 'id'>

export async function deleteTenant(args: ArgsDeleteTenantFn) {
  return await sendDataAxios({
    url: API_ROUTE.TENANT.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
