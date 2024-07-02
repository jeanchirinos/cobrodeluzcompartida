'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Tenant } from '@/models/Tenant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { Participant } from '@/models/Participant'

type ArgsDeleteTenantFn = Pick<Tenant, 'id'> & {
  lightMeterId: Participant['id']
}

export async function deleteTenant(args: ArgsDeleteTenantFn) {
  return await sendData({
    url: API_ROUTE.TENANT.DESTROY({ id: args.id }),
    config: {
      method: 'DELETE',
    },
    options: {
      revalidateTagParams: [API_ROUTE.TENANT.INDEX({ lightMeterId: args.lightMeterId })],
    },
  })
}