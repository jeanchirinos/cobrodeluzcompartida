'use client'

import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
import { createRentalGroup } from '../createRentalGroup/createRentalGroup'

import {
  ArgsCreateRentalGroupFn,
  createRentalGroupRegister,
} from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/createRentalGroupRegister'
import { CookiesFormDataAndResults, schemaCookiesFormDataAndResults } from './createRentalGroupWithSessionCookie.schema'
import { getCookie, removeCookie } from 'typescript-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// export async function createGroupWithSessionCookie() {
export function useCreateGroupWithSessionCookie() {
  const { push } = useRouter()

  async function execute() {
    // const temporalFormDataCookie = cookies().get(COOKIES_TEMPORAL_FORM_DATA)
    const temporalFormDataCookie = getCookie(COOKIES_TEMPORAL_FORM_DATA)

    if (!temporalFormDataCookie) return

    // cookies().delete(COOKIES_TEMPORAL_FORM_DATA)
    removeCookie(COOKIES_TEMPORAL_FORM_DATA)

    const temporalFormData: CookiesFormDataAndResults = JSON.parse(temporalFormDataCookie)
    const temporalFormDataValidation = schemaCookiesFormDataAndResults.safeParse(temporalFormData)

    if (temporalFormDataValidation.error) return

    // Create rental group
    const res = await createRentalGroup({
      n_participant: temporalFormData.results.length,
      return_tenants: true,
    })

    if (!res.ok) return

    // Create rental group register
    const results: ArgsCreateRentalGroupFn['results'] = res.data.tenants_ids.map((tenant_id, i) => {
      const { amount, consumption_kwh } = temporalFormData.results[i]

      return {
        tenant_id,
        amount,
        consumption_kwh,
      }
    })

    const response = await createRentalGroupRegister({
      billData: { ...temporalFormData.billData, rental_group_id: res.data.rental_group_id, year: 2024, month: 8 },
      results,
    })

    if (response.ok) {
      // redirect(ROUTE.GROUPS.REGISTERS({ id: res.data.rental_group_id }))
      push(ROUTE.GROUPS.REGISTERS.INDEX({ id: res.data.rental_group_id }))
      toast.success('Se creó un grupo con un registro')
      return true
    }
  }

  return { execute }
}
