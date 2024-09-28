'use client'

import { NavbarMenu } from '@nextui-org/react'
import { HeaderLinkNavMenuItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'

export function NavMenu() {
  const { data, isLoading } = useGetSession()

  if (isLoading) return null

  return (
    <NavbarMenu>
      {data ? (
        <HeaderLinkNavMenuItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavMenuItem>
      ) : (
        <HeaderLinkNavMenuItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavMenuItem>
      )}
    </NavbarMenu>
  )
}
