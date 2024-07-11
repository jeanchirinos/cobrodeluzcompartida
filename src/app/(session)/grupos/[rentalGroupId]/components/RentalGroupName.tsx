'use client'

import { Skeleton } from '@/components/Skeleton'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'

export function RentalGroupName() {
  const {
    data: { rentalGroup },
    isLoading,
  } = useGetRentalGroupById()

  return (
    <h1 className='text-2xl font-bold'>
      <Skeleton chars={15} isLoading={isLoading}>
        {rentalGroup.name}
      </Skeleton>
    </h1>
  )
}
