'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'
import { schemaUpdateParticipant } from './updateParticipant.schema'
import { Participant } from '@/models/Participant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { waitFor } from '@/utilities/utilities'
import { CustomResponse } from '@/utilities/request/sendData/types'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateParticipant> & {
  rentalGroupId: RentalGroup['id']
  id: Participant['id']
}

export async function updateParticipant(args: ArgsUpdateRentalGroupFn) {
  const { rentalGroupId, id, ...restArgs } = args

  // return await sendData({
  //   url: API_ROUTE.PARTICIPANT.UPDATE({ id }),
  //   config: {
  //     body: restArgs,
  //     method: 'PUT',
  //   },
  //   options: {
  //     schema: schemaUpdateParticipant,
  //     revalidateTagParams: [API_ROUTE.PARTICIPANT.INDEX({ rentalGroupId })],
  //   },
  // })

  await waitFor(0.5)

  const response: CustomResponse<{}> = {
    data: {},
    msg: 'Participant updated',
    ok: true,
  }

  return response
}
