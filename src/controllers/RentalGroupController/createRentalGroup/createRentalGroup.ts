'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'
import { RentalGroup, schemaRentalGroup } from '@/models/RentalGroup'
import { Participant, schemaParticipant } from '@/models/Participant'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup>

type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  participants_ids: Participant['id'][]
}

// const schemaCreateRentalGroupResponse = z.object({
//   rental_group_id: schemaRentalGroup.shape.id,
//   participants_ids: z.array(schemaParticipant.shape.id),
// })

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  const data = await newSendData<ResponseCreateRentalGroup, typeof schemaCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    config: {
      body: args,
    },
    options: {
      schema: schemaCreateRentalGroup,
      onSuccess(data) {
        redirect(ROUTE.GROUPS.REGISTERS({ id: data.rental_group_id }))
      },
      revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
      // responseSchema: schemaCreateRentalGroupResponse,
    },
  })

  return data
}
