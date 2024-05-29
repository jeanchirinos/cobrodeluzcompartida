'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type ArgsCreateRentalGroupFn = z.infer<typeof schema>

type BodyCreateRentalGroup = ArgsCreateRentalGroupFn
type ResponseCreateRentalGroup = { rental_group_id: string; participants_ids: number[] }

const schema = z.object({
  name: z.string().email().optional(),
  n_participant: z.number().min(8).optional(),
  return_participants: z.boolean().optional(),
})

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  const data = await sendData<BodyCreateRentalGroup, ResponseCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    body: args,
    schema,
    onSuccess(data) {
      redirect(ROUTE.GROUPS.REGISTERS(data.rental_group_id))
    },
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.INDEX],
  })

  return data
}
