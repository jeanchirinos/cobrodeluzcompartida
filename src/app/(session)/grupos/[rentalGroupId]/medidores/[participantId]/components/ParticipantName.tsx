'use client'

import { Skeleton } from '@/components/Skeleton'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'

export function ParticipantName() {
  const { data: participant, isPending } = useGetParticipantById()

  return (
    <h2 className='text-xl font-bold'>
      <Skeleton chars={15} isLoading={isPending}>
        {participant?.alias}
      </Skeleton>
    </h2>
  )
}
