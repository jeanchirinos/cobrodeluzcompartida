'use client'

import { NavbarContent } from '@heroui/react'
import { HeaderLinkNavItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { Skeleton } from '@/components/Skeleton'
import { ErrorUi } from '@/components/other/ComponentError'

export function Nav() {
  const { isPending, isError, data } = useGetSession()

  const content = () => {
    if (isPending) return <></>
    if (isError) return <ErrorUi />

    if (data) {
      return <HeaderLinkNavItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavItem>
    } else {
      return <HeaderLinkNavItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavItem>
    }
  }

  return (
    <NavbarContent className='hidden gap-x-4 sm:flex' justify='start'>
      <Skeleton isLoading={isPending} chars={6}>
        {content()}
      </Skeleton>
    </NavbarContent>
  )
}
