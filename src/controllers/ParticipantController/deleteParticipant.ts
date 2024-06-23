'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsDeleteParticipantFn = Pick<Participant, 'id'> & {
  rentalGroupId: RentalGroup['id']
}

export async function deleteParticipant(args: ArgsDeleteParticipantFn) {
  return newSendData({
    url: API_ROUTE.PARTICIPANT.DESTROY({ id: args.id }),
    config: {
      method: 'DELETE',
    },
    options: {
      revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId: args.rentalGroupId })],
    },
  })
}
