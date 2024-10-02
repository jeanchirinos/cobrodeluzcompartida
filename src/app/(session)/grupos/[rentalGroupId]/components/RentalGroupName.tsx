'use client'

import { Skeleton } from '@/components/Skeleton'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'

export function RentalGroupName() {
  const { data: rentalGroup, isLoading, error } = useGetRentalGroupById()

  if (error instanceof AxiosError) {
    error.status === 404 && notFound()
  }

  return (
    <h1 className='text-2xl font-bold'>
      <Skeleton chars={15} isLoading={isLoading}>
        {rentalGroup?.name}
      </Skeleton>
    </h1>
  )
}
