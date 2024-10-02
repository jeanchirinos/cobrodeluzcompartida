import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'
import { z } from 'zod'
import { schemaCreateParticipant } from './createParticipant.schema'
import { Participant } from '@/models/Participant'
import { RentalGroup } from '@/models/RentalGroup'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateParticipant>
type ResponseCreateParticipant = Pick<Participant, 'alias' | 'id' | 'is_main'> & { rental_group_id: RentalGroup['id'] }

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  return await sendData<ResponseCreateParticipant>({
    url: API_ROUTE.PARTICIPANT.STORE,
    data: args,
    schema: schemaCreateParticipant,
  })
}
