'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateParticipant> & {
  id: Participant['id']
}

export async function updateParticipant(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.PARTICIPANT.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaUpdateParticipant,
      revalidateTagParams: [API_ROUTE.PARTICIPANT.SHOW({ id })],
    },
  })
}
