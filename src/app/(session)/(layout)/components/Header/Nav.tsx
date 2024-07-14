'use client'

// import { getSession } from '@/controllers/AuthController/getSession'
import { NavbarContent } from '@nextui-org/react'
import { HeaderLinkNavItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'

export function Nav() {
  // const {session} = await getSession()
  const { data, isLoading } = useGetSession()

  const { session } = data ?? {}
  if (isLoading) return null

  return (
    <NavbarContent className='hidden gap-x-4 sm:flex' justify='start'>
      {session ? (
        <HeaderLinkNavItem href={ROUTE.GROUPS.INDEX}>Grupos</HeaderLinkNavItem>
      ) : (
        <HeaderLinkNavItem href={ROUTE.CALCULATE}>Calcular</HeaderLinkNavItem>
      )}
    </NavbarContent>
  )
}
