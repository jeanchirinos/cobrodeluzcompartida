import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { ROUTE } from '@/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createGroup } from '../createGroup'

export async function createGroupWithSessionCookie() {
  const temporalFormDataCookie = cookies().get(COOKIES_TEMPORAL_FORM_DATA)

  if (!temporalFormDataCookie) {
    cookies().delete(COOKIES_TEMPORAL_FORM_DATA)
    return redirect(ROUTE.GROUPS.INDEX)
  }

  const temporalFormData = JSON.parse(temporalFormDataCookie.value)

  const res = await createGroup(null, temporalFormData)

  cookies().delete(COOKIES_TEMPORAL_FORM_DATA)

  if (res.ok) {
    redirect(ROUTE.GROUPS.ID(res.data.groupId))
  } else {
    redirect(ROUTE.GROUPS.INDEX)
  }
}
