'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'
import { Tenant } from '@/models/Tenant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { schemaUpdateTenant } from './updateTenant.schema'

type ArgsUpdateRentalGroup = z.infer<typeof schemaUpdateTenant> & {
  participantId: RentalGroup['id']
  id: Tenant['id']
}

export async function updateTenant(args: ArgsUpdateRentalGroup) {
  const { participantId, id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.TENANT.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaUpdateTenant,
      revalidateTagParams: API_ROUTE.TENANT.INDEX({ participantId }),
    },
  })
}
