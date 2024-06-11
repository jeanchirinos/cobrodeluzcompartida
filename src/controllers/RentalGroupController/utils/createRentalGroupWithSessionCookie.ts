import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { ROUTE } from '@/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createRentalGroup } from '../createRentalGroup/createRentalGroup'
import { createRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister'
import { CreateRentalGroupRegisterBody } from '@/controllers/RentalGroupRegisterController/utils/types'

export async function createGroupWithSessionCookie() {
  const temporalFormDataCookie = cookies().get(COOKIES_TEMPORAL_FORM_DATA)

  if (!temporalFormDataCookie) redirect(ROUTE.GROUPS.INDEX)

  const temporalFormData = JSON.parse(temporalFormDataCookie.value) as CreateRentalGroupRegisterBody

  const res = await createRentalGroup({
    n_participant: temporalFormData.results.length,
    return_participants: true,
  })

  if (!res.ok) redirect(ROUTE.GROUPS.INDEX)

  const resultsWithIds = temporalFormData.results.map((result, i) => ({
    ...result,
    participant: {
      id: res.data.participants_ids[i].toString(),
    },
  }))

  const formDataToCreateRentalGroupRegister = structuredClone(temporalFormData)
  formDataToCreateRentalGroupRegister.results = resultsWithIds

  if (res.ok) {
    const response = await createRentalGroupRegister({
      body: formDataToCreateRentalGroupRegister,
      rentalGroupId: res.data.rental_group_id,
    })

    cookies().delete(COOKIES_TEMPORAL_FORM_DATA)

    if (response.ok) {
      redirect(ROUTE.GROUPS.REGISTERS(res.data.rental_group_id))
    } else {
      redirect(ROUTE.GROUPS.INDEX)
    }
  } else {
    redirect(ROUTE.GROUPS.INDEX)
  }
}
