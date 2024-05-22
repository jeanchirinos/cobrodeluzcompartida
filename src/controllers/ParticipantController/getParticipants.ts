'use server'

import { Participant } from '@/models/Participant'
import { getData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'

export async function getRentalGroupRegister(rentalGroupId: number) {
  // const data = await getData<Participant[]>(`participants/${rentalGroupId}`, {
  //   cache: 'no-store',
  //   next: {
  //     tags: ['participants'],
  //   },
  // })

  //TODO: Delete when API is ready
  const data: Participant[] = [
    {
      id: '1',
      alias: 'Principal',
      is_main: true,
      key: '123456',
      avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      id: '2',
      alias: 'Consumo 1',
      is_main: false,
      key: '789012',
      avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      id: '3',
      alias: 'Consumo 2',
      is_main: false,
      key: '345678',
      avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
  ]

  return data
}
