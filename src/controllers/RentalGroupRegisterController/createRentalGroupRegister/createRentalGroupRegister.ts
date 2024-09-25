'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'
import { SetOptional } from 'type-fest'
import { z } from 'zod'
import { IGV } from '../calculateResults/calculateResults'
import { schemaCreateRentalGroupRegister } from './createRentalGroupRegister.schema'

export type ArgsCreateRentalGroupFn = Pick<BodyCreateRentalGroupFn, 'results'> & {
  billData: SetOptional<BodyCreateRentalGroupFn['billData'], 'igv'>
}

export type BodyCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroupRegister>

type ResponseCreateRentalGroup = Pick<BillData, 'year' | 'month'>

export async function createRentalGroupRegister(args: ArgsCreateRentalGroupFn) {
  const { billData, results } = args
  const { igv = IGV } = billData

  const body: BodyCreateRentalGroupFn = {
    billData: { ...billData, igv },
    results,
  }

  return await sendDataAxios<ResponseCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.STORE,
    data: body,
    schema: schemaCreateRentalGroupRegister,
  })
}
