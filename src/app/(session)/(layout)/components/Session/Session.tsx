'use client'

import { Skeleton } from '@/components/Skeleton'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged/UserNotLogged'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { ErrorUi } from '@/components/other/ComponentError'

export function Session() {
  const { data, isPending, isError } = useGetSession()

  if (isPending) return <Skeleton className='size-8 rounded-full' />
  if (isError) return <ErrorUi />

  if (data) {
    return <UserLogged session={data} />
  } else {
    return <UserNotLogged />
  }
}
