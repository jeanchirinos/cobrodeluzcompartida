'use server'

// import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { Result } from '@/models/Result'
import { SearchParamsProps } from '@/types'
// import { getData } from '@/utilities/actionRequest'
// import { getUrlWithSearchParams } from '@/utilities/utilities'

export type GetRentalGroupRegisterParams = SearchParamsProps<'year' | 'month'>

type ArgsGetRentalGroupRegisterFn = {
  params: { rentalGroupId: RentalGroup['id'] }
  searchParams: GetRentalGroupRegisterParams
}

type ResponseGetRentalGroupRegister = {
  billData: BillData
  results: (Result & { participant: Participant })[]
} | null

export async function getRentalGroupRegister(args: ArgsGetRentalGroupRegisterFn) {
  // const { params, searchParams } = args

  // const { url } = getUrlWithSearchParams<GetRentalGroupRegisterParams>({
  //   hostname: API_ROUTE.RENTAL_GROUP_REGISTER.SHOW(params.rentalGroupId),
  //   searchParams,
  // })

  // const data = await getData<ResponseGetRentalGroupRegister>(url, {
  //   next: {
  //     tags: [url],
  //   },
  // })

  //TODO: Delete when API is ready
  const data: ResponseGetRentalGroupRegister = {
    billData: {
      id: '1',
      consumption_kwh: 211,
      kwh_price: 0.6758,
      current_month_total: 188.26,
      total: 190,
      year: '2024',
      month: '1',
      igv: 0.18,
      rental_group_id: '1',
    },
    results: [
      {
        id: '1',
        consumption_kwh: 188.84,
        amount: 157.8,
        bill_id: '1',
        participant_id: '1',
        participant: {
          id: 1,
          alias: 'Principal',
          is_main: true,
          key: '123456',
          avatar_url: 'avatar1',
        },
      },
      {
        id: '2',
        consumption_kwh: 6.84,
        amount: 12.7,
        bill_id: '1',
        participant_id: '2',
        participant: {
          id: 2,
          alias: 'Consumo 1',
          is_main: false,
          key: '789012',
          avatar_url: 'avatar2',
        },
      },
      {
        id: '3',
        consumption_kwh: 15.32,
        amount: 19.5,
        bill_id: '1',
        participant_id: '3',
        participant: {
          id: 3,
          alias: 'Consumo 2',
          is_main: false,
          key: '345678',
          avatar_url: 'avatar3',
        },
      },
    ],
  }

  return data
}
