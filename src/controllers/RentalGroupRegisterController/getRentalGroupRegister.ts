'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { Result } from '@/models/Result'
import { Tenant } from '@/models/Tenant'
import { SearchParamsProps } from '@/types'
import { getData } from '@/utilities/request/getData/getData'
import { getUrlWithSearchParams } from '@/utilities/utilities'

export type GetRentalGroupRegisterParams = SearchParamsProps<'year' | 'month'>

type ArgsGetRentalGroupRegisterFn = {
  params: { rentalGroupId: RentalGroup['id'] }
  searchParams: GetRentalGroupRegisterParams
}

export type RentalGroupRegisterFound = {
  billData: BillData
  results: Array<Result & { participant: Participant; tenant: Tenant }>
}

export type ResponseGetRentalGroupRegister = RentalGroupRegisterFound | null

// export type ResponseGetRentalGroupRegister = {
//   billData: BillData
//   results: Array<Result & { participant: Participant; tenant: Tenant }>
// }

export async function getRentalGroupRegister(args: ArgsGetRentalGroupRegisterFn) {
  const { params, searchParams } = args

  // const { url } = getUrlWithSearchParams<GetRentalGroupRegisterParams>({
  //   hostname: API_ROUTE.RENTAL_GROUP_REGISTER.SHOW({ rentalGroupId: params.rentalGroupId }),
  //   searchParams,
  // })

  // const rentalGroupRegister = await getData<ResponseGetRentalGroupRegister>({
  //   url,
  //   mode: 'null'
  // })

  // TODO: Delete when API is ready
  const rentalGroupRegister: ResponseGetRentalGroupRegister = {
    billData: {
      id: 1,
      consumption_kwh: 211,
      kwh_price: 0.6758,
      current_month_total: 188.26,
      total: 190,
      year: searchParams.year ? Number(searchParams.year) : 2024,
      month: searchParams.month ? Number(searchParams.month) : new Date().getMonth() + 1,
      igv: 0.18,
      rental_group_id: 1,
    },
    results: [
      {
        id: 1,
        consumption_kwh: 188.84,
        amount: 157.8,
        bill_id: 1,
        tenant_id: 1,
        participant: {
          id: 1,
          alias: 'Principal',
          is_main: true,
          active: true,
        },
        tenant: {
          id: 1,
          alias: 'Inquilino 1',
          active: true,
          avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
          key: '123456',
        },
      },
      {
        id: 2,
        consumption_kwh: 188.84,
        amount: 157.8,
        bill_id: 2,
        tenant_id: 2,
        participant: {
          id: 2,
          alias: 'Medidor secundario',
          is_main: true,
          active: true,
        },
        tenant: {
          id: 2,
          alias: 'Inquilino 2',
          active: true,
          avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
          key: '123456',
        },
      },
    ],
  }

  return { rentalGroupRegister }
}
