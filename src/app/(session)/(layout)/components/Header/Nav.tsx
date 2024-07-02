import { getSession } from '@/controllers/AuthController/getSession'
import { NavbarContent } from '@nextui-org/react'
import { HeaderLinkNavItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'

export async function Nav() {
  const {session} = await getSession()

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
