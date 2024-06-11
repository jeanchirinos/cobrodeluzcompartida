'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'
import { Participant } from '@/models/Participant'

type ArgsUpdateRentalGroup = z.infer<typeof schemaUpdateParticipant> & {
  rentalGroupId: RentalGroup['id']
  id: Participant['id']
}

export async function updateParticipant(args: ArgsUpdateRentalGroup) {
  const { rentalGroupId, id, ...restArgs } = args

  return sendData({
    url: API_ROUTE.PARTICIPANT.UPDATE(id),
    schema: schemaUpdateParticipant,
    body: restArgs,
    revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX(rentalGroupId)],
    method: 'PUT',
  })
}
