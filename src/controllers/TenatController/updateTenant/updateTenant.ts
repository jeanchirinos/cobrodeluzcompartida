'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { Tenant } from '@/models/Tenant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { schemaUpdateTenant } from './updateTenant.schema'

type ArgsUpdateRentalGroup = z.infer<typeof schemaUpdateTenant> & Pick<Tenant, 'id'>

export async function updateTenant(args: ArgsUpdateRentalGroup) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.TENANT.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaUpdateTenant,
      revalidateTagParams: '/',
    },
  })
}
