import { Tenant } from '@/models/Tenant'
import { RentalGroup } from '@/models/RentalGroup'
import { API_ROUTE } from '@/constants/api-routes'
import { getDataAxios } from '@/utilities/request/getData/getDataAxios'

type ArgsGetTenantByIdFn = Pick<Tenant, 'id'>

type ResponseGetPenantById = Tenant & {
  participant_id: RentalGroup['id']
}

export async function getTenantById(args: ArgsGetTenantByIdFn) {
  const { id } = args

  const tenant = await getDataAxios<ResponseGetPenantById>({
    url: API_ROUTE.TENANT.SHOW({ id }),
  })

  return { tenant }
}
