'use client'

import { Skeleton } from '@/components/Skeleton'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged/UserNotLogged'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'

export function Session() {
  const { data, isLoading } = useGetSession()

  if (isLoading) return <Skeleton isLoaded={false} className='size-8 rounded-full' />

  return data ? <UserLogged session={data} /> : <UserNotLogged />
}
