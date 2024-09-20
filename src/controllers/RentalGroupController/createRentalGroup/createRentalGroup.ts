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
  // return await sendData<typeof schemaCreateRentalGroup, ResponseCreateRentalGroup>({
  //   url: API_ROUTE.RENTAL_GROUP.STORE,
  //   config: {
  //     body: args,
  //   },
  //   options: {
  //     schema: schemaCreateRentalGroup,
  //     revalidateTagParams: API_ROUTE.RENTAL_GROUP.INDEX,
  //   },
  // })

  return await sendDataAxios<ResponseCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    data: args,
    schema: schemaCreateRentalGroup,
  })

  // const data: { ok: true; data: ResponseCreateRentalGroup; msg: string } = {
  //   ok: true,
  //   data: {
  //     rental_group_id: 1,
  //     tenant_ids: [1, 2],
  //   },
  //   msg: 'Rental group created',
  // }
}
