'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'
import { RentalGroup } from '@/models/RentalGroup'
import { Participant } from '@/models/Participant'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup>

type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  participants_ids: Participant['id'][]
}

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  const data = await newSendData<ResponseCreateRentalGroup, typeof schemaCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    config: {
      body: args,
    },
    options: {
      schema: schemaCreateRentalGroup,
      revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
    },
  })

  return data
}
