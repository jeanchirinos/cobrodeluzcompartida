'use server'

import { type Tenant } from '@/models/Tenant'
import { type Participant } from '@/models/Participant'
// import { API_ROUTE } from '@/constants/api-routes'
// import { getData } from '@/utilities/request/getData/getData'

type ArgsGetTenantsFn = { lightMeterId: Participant['id'] }

export type ResponseGetTenants = Tenant[]

export async function getTenants(args: ArgsGetTenantsFn) {
  // const tenants = await getData<ResponseGetTenants>({
  //   url: API_ROUTE.TENANT.INDEX({ lightMeterId: args.lightMeterId }),
  // })

  const tenants: ResponseGetTenants = [
    {
      id: 1,
      active: true,
      alias: 'Tenant 1',
      avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
      key: '123456',
    },
    {
      id: 2,
      active: false,
      alias: 'Tenant 2',
      avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
      key: '789012',
    },
  ]

  return { tenants }
}
