'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'
import { Participant } from '@/models/Participant'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsUpdateRentalGroup = z.infer<typeof schemaUpdateParticipant> & {
  rentalGroupId: RentalGroup['id']
  id: Participant['id']
}

export async function updateParticipant(args: ArgsUpdateRentalGroup) {
  const { rentalGroupId, id, ...restArgs } = args

  return newSendData({
    url: API_ROUTE.PARTICIPANT.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaUpdateParticipant,
      revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId })],
    },
  })
}
