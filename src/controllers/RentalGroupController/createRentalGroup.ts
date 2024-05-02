'use server'

import { sendData } from '@/utilities/actionRequest'

export async function createRentalGroup() {
  type Response = { id: string }

  // return sendData<Response>({
  //   url: 'rental-group-create',
  // })

  //TODO: Delete when API is ready
  return { ok: true, msg: 'Grupo de renta creado', data: { id: '1' } }
}
