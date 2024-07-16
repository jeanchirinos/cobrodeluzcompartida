'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsToggleActiveParticipantFn = {
  participantId: RentalGroup['id']
}

export async function toggleActiveParticipant(args: ArgsToggleActiveParticipantFn) {
  const { participantId } = args

  return await sendData({
    url: API_ROUTE.PARTICIPANT.TOGGLE_ACTIVE({ participantId }),
    config: {
      method: 'PATCH',
    },
    options: {
      revalidateTagParams: '/',
    },
  })
}
