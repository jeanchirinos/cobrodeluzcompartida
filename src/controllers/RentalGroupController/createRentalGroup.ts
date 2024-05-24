'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type CreateRentalGroup = {
  name?: string
  n_participant?: number
  return_participants?: true
}

type Response = { rental_group_id: string; participants_ids: number[] }

// type CreateRentalGroupReturnParticipantsParams = CreateRentalGroup & {return_participants: true}
// type CreateRentalGroupReturnParticipantsResponse = Response & { participants_ids: number[] }

// type CreateRentalGroupWithoutReturnParticipantsParams = CreateRentalGroup & {return_participants: false}
// type CreateRentalGroupWithoutReturnParticipantsResponse = Response

// export async function createRentalGroup(
//   args: CreateRentalGroupReturnParticipantsParams
// ): Promise<CreateRentalGroupReturnParticipantsResponse>

const schema = z.object({
  name: z.string().email().optional(),
  n_participant: z.string().min(8).optional(),
  return_participants: z.boolean().optional(),
})

export async function createRentalGroup(args?: CreateRentalGroup) {
  const data = await sendData<Response>({
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
