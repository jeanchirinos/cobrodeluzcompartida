'use server'

import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'

export async function getRentalGroupById(id: string | number): Promise<RentalGroup | null> {
  // const data = await getData<RentalGroup | null>(`rental-groups/${id}`, {
  //   cache: 'no-store',
  //   next: {
  //     tags: ['rental-group'],
  //   },
  // })

  //TODO: Delete when API is ready
  const data: RentalGroup | null = {
    id: 1,
    name: 'Grupo 1',
  }

  return data
}
