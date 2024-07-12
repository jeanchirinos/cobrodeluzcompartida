'use client'

import { Skeleton } from '@/components/Skeleton'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'

export function ParticipantName() {
  const {
    data: { participant },
    isLoading,
  } = useGetParticipantById()

  return (
    <h2 className='text-xl font-bold'>
      <Skeleton chars={15} isLoading={isLoading}>
        {participant.alias}
      </Skeleton>
    </h2>
  )
}
