'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'
import { RentalGroup } from '@/models/RentalGroup'
import { Participant } from '@/models/Participant'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup> | undefined

type BodyCreateRentalGroup = ArgsCreateRentalGroupFn
type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  participants_ids: Participant['id'][]
}

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  const data = await newSendData<BodyCreateRentalGroup, ResponseCreateRentalGroup>({
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
    },
  })

  return data
}
