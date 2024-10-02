import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'
import { RentalGroup } from '@/models/RentalGroup'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateParticipant> & Pick<Participant, 'id'>
type ResponseUpdateParticipant = Participant & { rental_group_id: RentalGroup['id'] }

export async function updateParticipant(args: ArgsUpdateRentalGroupFn) {
  const { id, ...data } = args

  return await sendData<ResponseUpdateParticipant, typeof schemaUpdateParticipant>({
    url: API_ROUTE.PARTICIPANT.UPDATE({ id }),
    data,
    method: 'PUT',
    schema: schemaUpdateParticipant,
  })
}
