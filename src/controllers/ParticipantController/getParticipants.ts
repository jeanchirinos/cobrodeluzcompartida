'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { newGetData } from '@/utilities/request/getData/getData'

type ArgsGetParticipantsFn = { rentalGroupId: RentalGroup['id'] }

export type ResponseGetParticipants = Participant[]

export async function getParticipants(args: ArgsGetParticipantsFn) {
  const participants = await newGetData<ResponseGetParticipants>({
    url: API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId: args.rentalGroupId }),
  })

  return { participants }
}
