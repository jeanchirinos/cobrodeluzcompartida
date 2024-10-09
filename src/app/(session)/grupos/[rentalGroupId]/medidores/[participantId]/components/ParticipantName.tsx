'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { Skeleton } from '@/components/Skeleton'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'

export function ParticipantName() {
  const { data: participant, isPending, error } = useGetParticipantById()

  if (error instanceof AxiosError) {
    error.status === 404 && notFound()
  }

  const content = () => {
    if (isPending) return <></>
    if (error) return <ErrorUi />

    return participant.alias
  }

  return (
    <h2 className='text-xl font-bold'>
      <Skeleton chars={15} isLoading={isPending}>
        {content()}
      </Skeleton>
    </h2>
  )
}
