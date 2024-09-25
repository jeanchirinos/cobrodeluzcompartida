'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup>

type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  tenants_ids: Array<Tenant['id']>
}

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  return await sendDataAxios<ResponseCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    data: args,
    schema: schemaCreateRentalGroup,
  })
}
