'use server'

import { sendData } from '@/utilities/request/sendData/sendData'
import { schemaCreateRentalGroupRegister } from './createRentalGroupRegister.schema'
import { z } from 'zod'
import { API_ROUTE } from '@/constants/api-routes'
import { IGV } from '../calculateResults/calculateResults'
import { SetOptional } from 'type-fest'

export type ArgsCreateRentalGroupFn = Pick<BodyCreateRentalGroupFn, 'results'> & {
  billData: SetOptional<BodyCreateRentalGroupFn['billData'], 'igv'>
}

export type BodyCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroupRegister>

export async function createRentalGroupRegister(args: ArgsCreateRentalGroupFn) {
  const { billData, results } = args
  const { igv = IGV } = billData

  const body: BodyCreateRentalGroupFn = {
    billData: { ...billData, igv },
    results,
  }

  return await sendData({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.STORE,
    config: {
      body,
    },
    options: {
      schema: schemaCreateRentalGroupRegister,
      revalidateTagParams: '/',
    },
  })
}
