'use server'

import { RentalGroup } from '@/models/RentalGroup'
import { getData } from '@/utilities/actionRequest'

export async function getRentalGroups() {
  // const data = await getData<RentalGroup[]>('rental-groups', {
  //   cache: 'no-store',
  //   next: {
  //     tags: ['rental-groups'],
  //   },
  // })

  //TODO: Delete when API is ready
  const data: RentalGroup[] = [
    {
      id: 1,
      name: 'Grupo 1',
      participants: 10,
    },
    {
      id: 2,
      name: 'Grupo 2',
      participants: 20,
    },
  ]

  return data
}
