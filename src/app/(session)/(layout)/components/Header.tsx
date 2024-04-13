import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import Logo from '@/public/img/logo.svg'
import { ROUTE } from '@/app/routes'

export function Header() {
  return (
    <Navbar position='static' className='w-[1600px] mx-auto max-w-full' maxWidth='full'>
      <NavbarBrand className='space-x-unit-xs'>
        <Link href={ROUTE.HOME}>
          <Logo />
        </Link>
        <p className='font-bold text-inherit'>CCSEC</p>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Iniciar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
