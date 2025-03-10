import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from '@heroui/navbar'
import Logo from '@/public/img/logo.svg'
import { ROUTE } from '@/constants/routes'
import { Session } from '../Session/Session'
import { Link } from '@/components/Link'
import { ThemeSwitcher } from '@/components/other/ThemeSwitcher'
import { Nav } from './Nav'
import { NavMenu } from './NavMenu'
import { $NAV_MENU_TOGGLE } from '@/constants/elements'

export function Header() {
  return (
    <Navbar
      className='main-container'
      classNames={{
        wrapper: 'px-0',
      }}
      maxWidth='full'
    >
      <NavbarContent className='!grow-0'>
        <NavbarMenuToggle id={$NAV_MENU_TOGGLE} aria-label='Abrir/Cerrar menú' className='sm:hidden' />
        <NavbarBrand>
          <Link href={ROUTE.HOME} className='flex w-fit items-center gap-x-2 font-bold text-inherit'>
            <Logo />
            <span>CLC</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <Nav />

      <NavbarContent justify='end'>
        <ThemeSwitcher />
        <Session />
      </NavbarContent>

      <NavMenu />
    </Navbar>
  )
}
