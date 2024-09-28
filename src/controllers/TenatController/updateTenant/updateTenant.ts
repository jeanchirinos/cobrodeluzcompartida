import { API_ROUTE } from '@/constants/api-routes'
import { Tenant } from '@/models/Tenant'
import { SchemaUpdateTenant, schemaUpdateTenant } from './updateTenant.schema'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsUpdateTenantFn = SchemaUpdateTenant & Pick<Tenant, 'id'>

export async function updateTenant(args: ArgsUpdateTenantFn) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.TENANT.UPDATE({ id }),
    schema: schemaUpdateTenant,
    data: restArgs,
    method: 'PUT',
  })
}
