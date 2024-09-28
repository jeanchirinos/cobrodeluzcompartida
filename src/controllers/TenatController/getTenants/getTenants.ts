import { type Tenant } from '@/models/Tenant'
import { type Participant } from '@/models/Participant'
import { API_ROUTE } from '@/constants/api-routes'
import { getDataAxios } from '@/utilities/request/getData/getDataAxios'

type ArgsGetTenantsFn = { participantId: Participant['id'] }

export type ResponseGetTenants = Array<Tenant & { participant_id: Participant['id'] }>

export async function getTenants(args: ArgsGetTenantsFn) {
  const tenants = await getDataAxios<ResponseGetTenants>({
    url: API_ROUTE.TENANT.INDEX({ participantId: args.participantId }),
  })

  return { tenants }
}
