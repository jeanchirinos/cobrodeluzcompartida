import { API_ROUTE } from '@/constants/api-routes'
import { Tenant } from '@/models/Tenant'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsDeleteTenantFn = Pick<Tenant, 'id'>

export async function deleteTenant(args: ArgsDeleteTenantFn) {
  return await sendData({
    url: API_ROUTE.TENANT.DESTROY({ id: args.id }),
    method: 'DELETE',
  })
}
