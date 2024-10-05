import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { Tenant } from '@/models/Tenant'
import { sendData } from '@/utilities/request/sendData/sendData'
import { type SchemaCreateRentalGroup, schemaCreateRentalGroup } from './createRentalGroup.schema'

type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  tenants_ids: Array<Tenant['id']>
}

export async function createRentalGroup(args?: SchemaCreateRentalGroup) {
  return await sendData<ResponseCreateRentalGroup, typeof schemaCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    data: args,
    schema: schemaCreateRentalGroup,
  })
}
