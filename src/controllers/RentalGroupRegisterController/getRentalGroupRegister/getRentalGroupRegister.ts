import { API_ROUTE } from '@/constants/api-routes'
import { BillData } from '@/models/BillData'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { Result } from '@/models/Result'
import { Tenant } from '@/models/Tenant'
import { getData } from '@/utilities/request/getData/getData'
import { getUrlWithSearchParams } from '@/utilities/utilities'
import { AxiosError } from 'axios'

type ArgsGetRentalGroupRegisterFn = {
  rentalGroupId: RentalGroup['id']
} & Partial<Pick<BillData, 'year' | 'month'>>

type ResponseGetRentalGroupRegister = {
  billData: BillData
  results: Array<Result & { participant: Participant; tenant: Tenant }>
}

export async function getRentalGroupRegister(args: ArgsGetRentalGroupRegisterFn) {
  const { rentalGroupId, ...searchParams } = args

  const { url } = getUrlWithSearchParams({
    hostname: API_ROUTE.RENTAL_GROUP_REGISTER.SHOW({ rentalGroupId }),
    searchParams,
  })

  try {
    const rentalGroupRegister = await getData<ResponseGetRentalGroupRegister>({
      url: url.toString(),
    })

    return { rentalGroupRegister }
  } catch (error) {
    if (error instanceof AxiosError && error.status === 404) {
      return null
    }

    throw error
  }
}
