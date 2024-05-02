import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { ROUTE } from '@/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createRentalGroup } from '../createRentalGroup'
import { createRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister'

export async function createGroupWithSessionCookie() {
  const temporalFormDataCookie = cookies().get(COOKIES_TEMPORAL_FORM_DATA)

  if (!temporalFormDataCookie) return redirect(ROUTE.GROUPS.INDEX)

  const temporalFormData = JSON.parse(temporalFormDataCookie.value)

  const res = await createRentalGroup()

  if (res.ok) {
    // TODO: temporalFormData must follow the structure required
    const response = await createRentalGroupRegister(temporalFormData)

    cookies().delete(COOKIES_TEMPORAL_FORM_DATA)

    if (response.ok) {
      redirect(ROUTE.GROUPS.ID(res.data.id))
    } else {
      redirect(ROUTE.GROUPS.INDEX)
    }
  } else {
    redirect(ROUTE.GROUPS.INDEX)
  }
}
