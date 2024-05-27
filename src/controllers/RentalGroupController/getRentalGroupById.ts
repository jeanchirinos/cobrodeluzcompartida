'use server'

// import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
// import { getData } from '@/utilities/actionRequest'

export async function getRentalGroupById(id: string | number): Promise<RentalGroup | null> {
  // export async function getRentalGroupById(id: string | number) {
  // const data = await getData<RentalGroup | null>(API_ROUTE.RENTAL_GROUP.SHOW(id), {
  //   cache: 'no-store',
  //   next: {
  //   tags: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
  //   },
  //   auth: true,
  // })

  //TODO: Delete when API is ready
  const data: RentalGroup | null = {
    id: 1,
    name: 'Grupo 1',
  }

  return data
}
