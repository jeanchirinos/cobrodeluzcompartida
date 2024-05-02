'use server'

import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'

type Params = {
  id: string
  participants: Participant[]
} & RentalGroup

export async function updateRentalGroupRegister(params: Params) {
  return sendData({
    url: `rental-group-register-update/${params.id}`,
    body: params,
    revalidateTagParams: ['rental-group-register'],
  })
}
