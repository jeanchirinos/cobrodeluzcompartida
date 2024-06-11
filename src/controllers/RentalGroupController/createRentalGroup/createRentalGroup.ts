'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'
import { RentalGroup } from '@/models/RentalGroup'
import { Participant } from '@/models/Participant'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup>

type BodyCreateRentalGroup = ArgsCreateRentalGroupFn
type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  participants_ids: Participant['id'][]
}

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  const data = await sendData<BodyCreateRentalGroup, ResponseCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    body: args,
    schema: schemaCreateRentalGroup,
    onSuccess(data) {
      redirect(ROUTE.GROUPS.REGISTERS(data.rental_group_id))
    },
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
  })

  return data
}
