'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateParticipant> & Pick<Participant, 'id'>

export async function updateParticipant(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendDataAxios({
    url: API_ROUTE.PARTICIPANT.UPDATE({ id }),
    data: restArgs,
    method: 'PUT',
    schema: schemaUpdateParticipant,
  })
}
