import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createRentalGroup } from '../createRentalGroup/createRentalGroup'
import { CookiesFormDataAndResults } from '@/app/(session)/calcular/components/SessionWarning/SaveButton'
import { createRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/createRentalGroupRegister'

export async function createGroupWithSessionCookie() {
  const temporalFormDataCookie = cookies().get(COOKIES_TEMPORAL_FORM_DATA)

  if (!temporalFormDataCookie) redirect(ROUTE.GROUPS.INDEX)

  const temporalFormData = JSON.parse(temporalFormDataCookie.value) as CookiesFormDataAndResults

  const res = await createRentalGroup({
    n_participant: temporalFormData.result.length,
    return_participants: true, // TODO: Return tenants ids
  })

  if (!res.ok) redirect(ROUTE.GROUPS.INDEX)

  if (res.ok) {
    const consumptions = res.data.participant_ids.map((id, i) => {
      const { amount, consumption } = temporalFormData.result[i].participant.tenant

      return {
        id,
        amount,
        consumption,
      }
    })

    const response = await createRentalGroupRegister({
      billData: temporalFormData.billData,
      consumptions,
    })

    cookies().delete(COOKIES_TEMPORAL_FORM_DATA)

    if (response.ok) {
      redirect(ROUTE.GROUPS.REGISTERS({ id: res.data.rental_group_id }))
    } else {
      redirect(ROUTE.GROUPS.INDEX)
    }
  } else {
    redirect(ROUTE.GROUPS.INDEX)
  }
}
