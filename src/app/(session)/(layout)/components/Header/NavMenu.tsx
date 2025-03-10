'use client'

import { NavbarMenu, Spinner } from '@heroui/react'
import { HeaderLinkNavMenuItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { ErrorUi } from '@/components/other/ComponentError'

export function NavMenu() {
  const { isPending, isError, data } = useGetSession()

  const content = () => {
    if (isPending) return <Spinner />
    if (isError) return <ErrorUi />

    if (data) {
      return <HeaderLinkNavMenuItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavMenuItem>
    } else {
      return <HeaderLinkNavMenuItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavMenuItem>
    }
  }

  return <NavbarMenu>{content()}</NavbarMenu>
}
