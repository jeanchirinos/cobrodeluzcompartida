'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { getData } from '@/utilities/actionRequest'
// import { getUrlWithSearchParams } from '@/utilities/utilities'

// type SearchParamsGetParticipants = {
//   rental_group_id: string
// }
type ResponseGetParticipants = Participant[]

type ArgsGetParticipantsFn = { rentalGroupId: string }

export async function getParticipants(args: ArgsGetParticipantsFn) {
  // const { url } = getUrlWithSearchParams<SearchParamsGetParticipants>({
  //   hostname: API_ROUTE.PARTICIPANT.INDEX,
  //   searchParams: { rental_group_id: args.rentalGroupId },
  // })

  const participants = await getData<ResponseGetParticipants>(
    API_ROUTE.PARTICIPANT.INDEX(args.rentalGroupId),
    {
      cache: 'no-store',
      next: {
        tags: [API_ROUTE.PARTICIPANT.INDEX(args.rentalGroupId)],
      },
      auth: true,
    }
  )

  return { participants }
}
