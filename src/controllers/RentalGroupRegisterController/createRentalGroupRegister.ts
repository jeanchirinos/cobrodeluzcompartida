'use server'

import { RentalGroup } from '@/models/RentalGroup'
// import { sendData } from '@/utilities/actionRequest'
import { CreateRentalGroupRegisterBody } from './utils/types'

export async function createRentalGroupRegister(args: {
  rentalGroupId: RentalGroup['id']
  body: CreateRentalGroupRegisterBody
}) {
  // const { rentalGroupId, body } = args

  // return sendData({
  //   url: `rental-group-register-create/${rentalGroupId}`,
  //   body,
  //   revalidateTagParams: ['rental-group-register'],
  // })

  return { ok: true, msg: 'Registro de renta creado' }
}
