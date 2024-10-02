import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/request/sendData/sendData'
import { z } from 'zod'
import { schemaUpdateRentalGroup } from './updateRentalGroup.schema'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateRentalGroup> & Pick<RentalGroup, 'id'>

type ResponseUpdateRentalGroup = Pick<RentalGroup, 'id' | 'name'> & { user_id: number }

export async function updateRentalGroup(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendData<ResponseUpdateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.UPDATE({ id }),
    data: restArgs,
    method: 'PUT',
    schema: schemaUpdateRentalGroup,
  })
}
