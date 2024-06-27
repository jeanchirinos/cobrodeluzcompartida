'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'
import { RentalGroup } from '@/models/RentalGroup'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup>

type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  participants_ids: Array<Participant['id']>
}

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  const data = await sendData<typeof schemaCreateRentalGroup, ResponseCreateRentalGroup>({
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
