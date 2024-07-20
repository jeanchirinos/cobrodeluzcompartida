'use server'

import { sendData } from '@/utilities/request/sendData/sendData'
import { schemaCreateRentalGroupRegister } from './createRentalGroupRegister.schema'
import { z } from 'zod'
import { API_ROUTE } from '@/constants/api-routes'

export type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroupRegister>

export async function createRentalGroupRegister(args: ArgsCreateRentalGroupFn) {
  // return await sendData({
  //   url: API_ROUTE.RENTAL_GROUP_REGISTER.STORE,
  //   config: {
  //     body: args,
  //   },
  //   options: {
  //     schema: schemaCreateRentalGroupRegister,
  //     revalidateTagParams: '/',
  //   },
  // })

  return { ok: true, msg: 'Registro de renta creado' }
}
