'use server'

import { sendData } from '@/utilities/actionRequest'

type CreateRentalGroup = {
  name?: 'Grupo Lince'
  n_participant?: number
  return_participants?: true
}

type Response = { id: string; participants_ids: number[] }

// type CreateRentalGroupReturnParticipantsParams = CreateRentalGroup & {return_participants: true}
// type CreateRentalGroupReturnParticipantsResponse = Response & { participants_ids: number[] }

// type CreateRentalGroupWithoutReturnParticipantsParams = CreateRentalGroup & {return_participants: false}
// type CreateRentalGroupWithoutReturnParticipantsResponse = Response

// export async function createRentalGroup(
//   args: CreateRentalGroupReturnParticipantsParams
// ): Promise<CreateRentalGroupReturnParticipantsResponse>

export async function createRentalGroup(args: CreateRentalGroup) {
  // return sendData<Response>({
  //   url: 'rental-group-create',
  // })

  //TODO: Delete when API is ready
  return { ok: true, msg: 'Grupo de renta creado', data: { id: '1', participants_ids: [1, 2, 3] } }
}
