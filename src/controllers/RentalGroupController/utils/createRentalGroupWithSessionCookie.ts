import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createRentalGroup } from '../createRentalGroup/createRentalGroup'

import {
  ArgsCreateRentalGroupFn,
  createRentalGroupRegister,
} from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/createRentalGroupRegister'
import { IGV } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import { CookiesFormDataAndResults, schemaCookiesFormDataAndResults } from './createRentalGroupWithSessionCookie.schema'

export async function createGroupWithSessionCookie() {
  const temporalFormDataCookie = cookies().get(COOKIES_TEMPORAL_FORM_DATA)

  if (!temporalFormDataCookie) return

  cookies().delete(COOKIES_TEMPORAL_FORM_DATA)

  const temporalFormData: CookiesFormDataAndResults = JSON.parse(temporalFormDataCookie.value)
  const temporalFormDataValidation = schemaCookiesFormDataAndResults.safeParse(temporalFormData)

  if (temporalFormDataValidation.error) return

  // Create rental group
  const res = await createRentalGroup({
    n_participant: temporalFormData.result.length,
    return_tenants: true,
  })

  if (!res.ok) return

  // Create rental group register
  const result: ArgsCreateRentalGroupFn['result'] = res.data.tenant_ids.map((tenant_id, i) => {
    const { amount, consumption_kwh } = temporalFormData.result[i]

    return {
      tenant_id,
      amount,
      consumption_kwh,
    }
  })

  const response = await createRentalGroupRegister({
    rental_group_id: res.data.rental_group_id,
    billData: { ...temporalFormData.billData, igv: IGV },
    result,
  })

  if (response.ok) {
    redirect(ROUTE.GROUPS.REGISTERS({ id: res.data.rental_group_id }))
  }
}
