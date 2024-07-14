'use client'

import { Skeleton } from '@/components/Skeleton'
// import { getSession } from '@/controllers/AuthController/getSession'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged/UserNotLogged'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'

export function Session() {
  // const { session } = await getSession()
  const { data, isLoading } = useGetSession()

  const { session } = data ?? {}
  if (isLoading) return <Skeleton isLoaded={false} className='size-8 rounded-full' />

  return session ? <UserLogged session={session} /> : <UserNotLogged />
}
