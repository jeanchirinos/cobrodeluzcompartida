'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { getData } from '@/utilities/actionRequest'

type ArgsGetParticipantsFn = { rentalGroupId: string }

type ResponseGetParticipants = Participant[]

export async function getParticipants(args: ArgsGetParticipantsFn) {
  const participants = await getData<ResponseGetParticipants>(
    API_ROUTE.PARTICIPANT.INDEX(args.rentalGroupId),
    {
      next: {
        tags: [API_ROUTE.PARTICIPANT.INDEX(args.rentalGroupId)],
      },
    }
  )

  return { participants }
}
