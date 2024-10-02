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

export type ResponseGetRentalGroupRegister = {
  billData: BillData
  results: Array<Result & { participant: Participant; tenant: Tenant }>
}

export async function getRentalGroupRegister(args: ArgsGetRentalGroupRegisterFn) {
  const { params, searchParams } = args

  const { url } = getUrlWithSearchParams<GetRentalGroupRegisterParams>({
    hostname: API_ROUTE.RENTAL_GROUP_REGISTER.SHOW({ rentalGroupId: params.rentalGroupId }),
    searchParams,
  })

  const rentalGroupRegister = await getData<ResponseGetRentalGroupRegister | undefined>({
    url: url.toString(),
  })

  return { rentalGroupRegister }
}
