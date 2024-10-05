'use client'

import { Skeleton } from '@/components/Skeleton'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged/UserNotLogged'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { ErrorUi } from '@/components/other/ComponentError'

export function Session() {
  const { data, isPending, error } = useGetSession()

  if (isPending) return <Skeleton className='size-8 rounded-full' />

  if (error) {
    if (error.status === 401) {
      return <UserNotLogged />
    } else {
      return <ErrorUi />
    }
  }

  return <UserLogged session={data} />
}
