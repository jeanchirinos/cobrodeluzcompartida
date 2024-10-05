'use client'

import { NavbarContent } from '@nextui-org/react'
import { HeaderLinkNavItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { Skeleton } from '@/components/Skeleton'

export function Nav() {
  const { isPending, error } = useGetSession()

  const content = () => {
    if (isPending) return <></>

    if (error) {
      if (error.status === 401) {
        return <HeaderLinkNavItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavItem>
      } else {
        return <p>Hubo un error</p>
      }
    }

    return <HeaderLinkNavItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavItem>
  }

  return (
    <NavbarContent className='hidden gap-x-4 sm:flex' justify='start'>
      <Skeleton isLoading={isPending} chars={6}>
        {content()}
      </Skeleton>
    </NavbarContent>
  )
}
