'use client'

import { SSTORAGE_TEMPORAL_FORM_DATA } from '@/constants/session-storage'
import { ROUTE } from '@/constants/routes'
import { ArgsCreateRentalGroupFn } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/createRentalGroupRegister'
import { useCreateRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/useCreateRentalGroupRegister'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCreateRentalGroup } from '../createRentalGroup/useCreateRentalGroup'
import { CookiesFormDataAndResults, schemaCookiesFormDataAndResults } from './createRentalGroupWithSessionCookie.schema'

export function useCreateGroupAndRegisterWithSavedData() {
  const { push } = useRouter()

  const { mutateAsync: mutateAsyncCreateRentalGroup } = useCreateRentalGroup()

  const { mutateAsync: mutateAsyncCreateRentalGroupRegister } = useCreateRentalGroupRegister()

  async function createGroupAndRegister() {
    const temporalFormDataCookie = sessionStorage.getItem(SSTORAGE_TEMPORAL_FORM_DATA)

    if (!temporalFormDataCookie) return false

    const temporalFormData: CookiesFormDataAndResults = JSON.parse(temporalFormDataCookie)
    const temporalFormDataValidation = schemaCookiesFormDataAndResults.safeParse(temporalFormData)

    if (temporalFormDataValidation.error) return false

    // Create rental group
    let res: Awaited<ReturnType<typeof mutateAsyncCreateRentalGroup>>

    try {
      res = await mutateAsyncCreateRentalGroup({
        n_participant: temporalFormData.results.length,
        return_tenants: true,
      })
    } catch (error) {
      toast.error('No se pudo crear el grupo')

      return false
    }

    // Create rental group register
    const results: ArgsCreateRentalGroupFn['results'] = res.data.tenants_ids.map((tenant_id, i) => {
      const { amount, consumption_kwh } = temporalFormData.results[i]

      return {
        tenant_id,
        amount,
        consumption_kwh,
      }
    })

    try {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1

      await mutateAsyncCreateRentalGroupRegister({
        billData: {
          ...temporalFormData.billData,
          rental_group_id: res.data.rental_group_id,
          year,
          month,
        },
        results,
      })
    } catch (error) {
      toast.error('No se pudo crear el registro')
      return false
    }

    push(ROUTE.GROUPS.REGISTERS.INDEX({ id: res.data.rental_group_id }))
    toast.success('Se creó un grupo con un registro')

    return true
  }

  return { createGroupAndRegister }
}
