import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateParticipant> & Pick<Participant, 'id'>

export async function updateParticipant(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.PARTICIPANT.UPDATE({ id }),
    data: restArgs,
    method: 'PUT',
    schema: schemaUpdateParticipant,
  })
}
