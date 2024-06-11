'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'

type ArgsUpdateRentalGroupRegisterFn = {
  id: RentalGroup['id']
  participants: Participant[]
} & RentalGroup

type BodyUpdateRentalGroupRegister = ArgsUpdateRentalGroupRegisterFn

export async function updateRentalGroupRegister(args: ArgsUpdateRentalGroupRegisterFn) {
  return sendData<BodyUpdateRentalGroupRegister, {}>({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.UPDATE(args.id),
    body: args,
    // revalidateTagParams: ['rental-group-register'],
  })
}
