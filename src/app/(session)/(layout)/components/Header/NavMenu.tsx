'use client'

import { NavbarMenu, Spinner } from '@nextui-org/react'
import { HeaderLinkNavMenuItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { ErrorUi } from '@/components/other/ComponentError'

export function NavMenu() {
  const { isPending, error } = useGetSession()

  const content = () => {
    if (isPending) return <Spinner />

    if (error) {
      if (error.status === 401) {
        return <HeaderLinkNavMenuItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavMenuItem>
      } else {
        return <ErrorUi />
      }
    }

    return <HeaderLinkNavMenuItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavMenuItem>
  }

  return <NavbarMenu>{content()}</NavbarMenu>
}
