'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'

type ArgsGetParticipantsFn = { rentalGroupId: RentalGroup['id'] }

export type ResponseGetParticipants = Participant[]

export async function getParticipants(args: ArgsGetParticipantsFn) {
  const { rentalGroupId } = args

  const participants = await getData<ResponseGetParticipants>(
    API_ROUTE.PARTICIPANT.INDEX(rentalGroupId),
    {
      next: {
        tags: [API_ROUTE.PARTICIPANT.INDEX(rentalGroupId)],
      },
    }
  )

  return { participants }
}
