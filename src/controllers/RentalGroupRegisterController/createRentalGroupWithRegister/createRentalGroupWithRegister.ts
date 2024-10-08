import { BillData } from '@/models/BillData'
import { RentalGroup } from '@/models/RentalGroup'
import { validateDataBeforeSendingRequest } from '@/utilities/request/sendData/sendData'
import { SuccesResponse } from '@/utilities/request/sendData/types'
import {
  SchemaCreateRentalGroupWithRegister,
  schemaCreateRentalGroupWithRegister,
} from './createRentalGroupWithRegister.schema'
import { createRentalGroup } from '@/controllers/RentalGroupController/createRentalGroup/createRentalGroup'
import {
  ArgsCreateRentalGroupFn,
  createRentalGroupRegister,
} from '../createRentalGroupRegister/createRentalGroupRegister'

type ResponseCreateRentalGroupWithRegister = {
  rental_group_id: RentalGroup['id']
  rental_group_register: Pick<BillData, 'year' | 'month'>
}

export async function createRentalGroupWithRegister(
  args: SchemaCreateRentalGroupWithRegister,
): Promise<SuccesResponse<ResponseCreateRentalGroupWithRegister>> {
  const validation = validateDataBeforeSendingRequest({ data: args, schema: schemaCreateRentalGroupWithRegister })

  if (!validation.success) {
    throw new Error(validation.message)
  }

  // Create rental group
  let createRentalGroupResponse: Awaited<ReturnType<typeof createRentalGroup>>

  try {
    createRentalGroupResponse = await createRentalGroup({
      n_participant: args.results.length,
      return_tenants: true,
    })
  } catch (error) {
    throw new Error('No se pudo crear el grupo')
  }

  // Create rental group register
  const results: ArgsCreateRentalGroupFn['results'] = createRentalGroupResponse.data.tenants_ids.map((tenant_id, i) => {
    const { amount, consumption_kwh } = args.results[i]

    return {
      tenant_id,
      amount,
      consumption_kwh,
    }
  })

  let createRentalGroupRegisterResponse: Awaited<ReturnType<typeof createRentalGroupRegister>>

  try {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1

    createRentalGroupRegisterResponse = await createRentalGroupRegister({
      billData: {
        ...args.billData,
        rental_group_id: createRentalGroupResponse.data.rental_group_id,
        year,
        month,
      },
      results,
    })
  } catch (error) {
    throw new Error('No se pudo crear el registro del grupo')
  }

  return {
    ok: true,
    data: {
      rental_group_id: createRentalGroupResponse.data.rental_group_id,
      rental_group_register: createRentalGroupRegisterResponse.data,
    },
    msg: 'Se creó un grupo con un registro',
  }
}
