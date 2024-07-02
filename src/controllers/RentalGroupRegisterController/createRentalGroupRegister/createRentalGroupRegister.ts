'use server'

import { schemaCreateRentalGroupRegister } from './createRentalGroupRegister.schema'
import { z } from 'zod'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroupRegister>

export async function createRentalGroupRegister(args: ArgsCreateRentalGroupFn) {
  // const { rentalGroupId, body } = args

  // return sendData({
  //   url: `rental-group-register-create/${rentalGroupId}`,
  //   body,
  //   revalidateTagParams: ['rental-group-register'],
  // })

  return { ok: true, msg: 'Registro de renta creado' }
}
