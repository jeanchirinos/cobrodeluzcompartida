'use client'

import { NavbarMenu } from '@nextui-org/react'
import { HeaderLinkNavMenuItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'

export function NavMenu() {
  const { data, isLoading } = useGetSession()

  const { session } = data ?? {}
  if (isLoading) return null

  return (
    <NavbarMenu>
      {session ? (
        <HeaderLinkNavMenuItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavMenuItem>
      ) : (
        <HeaderLinkNavMenuItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavMenuItem>
      )}
    </NavbarMenu>
  )
}
