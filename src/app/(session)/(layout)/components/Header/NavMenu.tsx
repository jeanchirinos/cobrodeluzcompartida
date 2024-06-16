import { getSession } from '@/controllers/AuthController/getSession'
import { NavbarMenu } from '@nextui-org/react'
import { HeaderLinkNavMenuItem } from './HeaderLink'
import { ROUTE } from '@/constants/routes'

export async function NavMenu() {
  const session = await getSession()

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
