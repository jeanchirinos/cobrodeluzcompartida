'use client'

import { NavbarContent } from '@nextui-org/react'
import { HeaderLinkNavItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { Skeleton } from '@/components/Skeleton'

export function Nav() {
  const { data, isPending } = useGetSession()

  return (
    <NavbarContent className='hidden gap-x-4 sm:flex' justify='start'>
      {isPending ? (
        <Skeleton chars={6} isLoading={isPending} />
      ) : data ? (
        <HeaderLinkNavItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavItem>
      ) : (
        <HeaderLinkNavItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavItem>
      )}
    </NavbarContent>
  )
}
