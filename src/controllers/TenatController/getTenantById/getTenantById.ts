import { Tenant } from '@/models/Tenant'
import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getData } from '@/utilities/request/getData/getData'

type ArgsGetTenantByIdFn = Pick<Tenant, 'id'>

type ResponseGetPenantById = Tenant & {
  participant_id: RentalGroup['id']
}

export async function getTenantById(args: ArgsGetTenantByIdFn) {
  const { id } = args

  const tenant = await getData<ResponseGetPenantById>({
    url: API_ROUTE.TENANT.SHOW({ id }),
  })

  return { tenant }
}
