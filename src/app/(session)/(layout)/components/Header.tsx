import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import Logo from '@/public/img/logo.svg'
import { ROUTE } from '@/routes'

export function Header() {
  return (
    <Navbar className='w-[1600px] mx-auto max-w-full' maxWidth='full'>
      <NavbarBrand className='space-x-unit-xs'>
        <Link href={ROUTE.HOME}>
          <Logo />
        </Link>
        <span className='font-bold text-inherit'>CCSEC</span>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Button color='primary' variant='flat'>
            Iniciar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
