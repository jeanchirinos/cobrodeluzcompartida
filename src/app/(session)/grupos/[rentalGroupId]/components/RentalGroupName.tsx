'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { Skeleton } from '@/components/Skeleton'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'

export function RentalGroupName() {
  const { data, isPending, error } = useGetRentalGroupById()

  if (error instanceof AxiosError) {
    error.status === 404 && notFound()
  }

  const content = () => {
    if (isPending) return <></>

    if (error) return <ErrorUi />

    return data.name
  }

  return (
    <h1 className='text-2xl font-bold'>
      <Skeleton chars={15} isLoading={isPending}>
        {content()}
      </Skeleton>
    </h1>
  )
}
