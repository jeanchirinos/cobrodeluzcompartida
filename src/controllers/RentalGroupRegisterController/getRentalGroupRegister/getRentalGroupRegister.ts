'use server'

import { BillData } from '@/models/BillData'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { Result } from '@/models/Result'
import { Tenant } from '@/models/Tenant'
import { SearchParamsProps } from '@/types'
import { waitFor } from '@/utilities/utilities'

export type GetRentalGroupRegisterParams = SearchParamsProps<'year' | 'month'>

type ArgsGetRentalGroupRegisterFn = {
  params: { rentalGroupId: RentalGroup['id'] }
  searchParams: GetRentalGroupRegisterParams
}

export type ResponseGetRentalGroupRegister = {
  billData: BillData
  results: Array<Result & { participant: Participant; tenant: Tenant }>
}

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

  const rentalGroupRegisters: ResponseGetRentalGroupRegister[] = [
    {
      billData: {
        id: 1,
        consumption_kwh: 211,
        kwh_price: 0.6758,
        current_month_total: 188.26,
        total: 190,
        year: 2024,
        month: 7,
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
            alias: 'Administador',
            active: true,
            avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
            key: '123456',
          },
        },
        {
          id: 2,
          consumption_kwh: 30.43,
          amount: 157.8,
          bill_id: 2,
          tenant_id: 2,
          participant: {
            id: 2,
            alias: 'Medidor secundario',
            is_main: true,
            active: false,
          },
          tenant: {
            id: 2,
            alias: 'Inquilino 1',
            active: false,
            avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
            key: '123456',
          },
        },
        {
          id: 3,
          consumption_kwh: 0,
          amount: 6.7,
          bill_id: 3,
          tenant_id: 3,
          participant: {
            id: 3,
            alias: 'Medidor terciario',
            is_main: true,
            active: true,
          },
          tenant: {
            id: 3,
            alias: 'Inquilino 2',
            active: false,
            avatar_url: 'https://storage.nijui.com/ccsec/avatars/avatar_1.webp',
            key: '123456',
          },
        },
      ],
    },
    {
      billData: {
        id: 1,
        consumption_kwh: 211,
        kwh_price: 0.6758,
        current_month_total: 188.26,
        total: 190,
        year: 2024,
        month: 5,
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
    },
  ]

  await waitFor(0.3)

  if (!searchParams.year && !searchParams.month) return { rentalGroupRegister: rentalGroupRegisters[0] }
  // if (!searchParams.year && !searchParams.month) return { rentalGroupRegister: null }

  const rentalGroupRegister =
    rentalGroupRegisters.find(
      register =>
        register.billData.year === Number(searchParams.year) && register.billData.month === Number(searchParams.month),
    ) ?? null

  return { rentalGroupRegister }
}
