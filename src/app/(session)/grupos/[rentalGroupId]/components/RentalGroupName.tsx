'use client'

import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import { Skeleton } from '@nextui-org/react'

export function RentalGroupName() {
  const {
    data: { rentalGroup },
    isLoading,
  } = useGetRentalGroupById()

  return (
    <h1 className='text-2xl font-bold'>
      <Skeleton
        classNames={{
          base: 'before:hidden',
        }}
        isLoaded={!isLoading}
      >
        {rentalGroup.name}
      </Skeleton>
    </h1>
  )
}
