import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { sendData } from '@/utilities/request/sendData/sendData'
import { SetOptional } from 'type-fest'
import { IGV } from '../calculateResults/calculateResults'
import { SchemaCreateRentalGroupRegister, schemaCreateRentalGroupRegister } from './createRentalGroupRegister.schema'

export type ArgsCreateRentalGroupFn = Pick<SchemaCreateRentalGroupRegister, 'results'> & {
  billData: SetOptional<SchemaCreateRentalGroupRegister['billData'], 'igv'>
}

type ResponseCreateRentalGroup = Pick<BillData, 'year' | 'month'>

export async function createRentalGroupRegister(args: ArgsCreateRentalGroupFn) {
  const { billData, results } = args
  const { igv = IGV } = billData

  const body: SchemaCreateRentalGroupRegister = {
    billData: { ...billData, igv },
    results,
  }

  return await sendData<ResponseCreateRentalGroup, typeof schemaCreateRentalGroupRegister>({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.STORE,
    data: body,
    schema: schemaCreateRentalGroupRegister,
  })
}
