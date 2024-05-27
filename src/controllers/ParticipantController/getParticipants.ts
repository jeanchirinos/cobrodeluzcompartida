'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { Participant } from '@/models/Participant'
import { getData } from '@/utilities/actionRequest'
import { getUrlWithSearchParams } from '@/utilities/utilities'

type SearchParamsGetParticipants = {
  rental_group_id: string
}
type ResponseGetParticipants = Participant[]

type ArgsGetParticipantsFn = { rentalGroupId: string }

export async function getParticipants(args: ArgsGetParticipantsFn) {
  // const { url } = getUrlWithSearchParams<SearchParamsGetParticipants>({
  //   hostname: API_ROUTE.PARTICIPANT.INDEX,
  //   searchParams: { rental_group_id: args.rentalGroupId },
  // })

  // const participants = await getData<ResponseGetParticipants>(url, {
  //   cache: 'no-store',
  //   next: {
  //     tags: [API_ROUTE.PARTICIPANT.INDEX],
  //   },
  //   auth: true,
  // })

  //TODO: Delete when API is ready
  const participants: Participant[] = [
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

  return { participants }
}
