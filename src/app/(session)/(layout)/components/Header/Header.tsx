import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from '@nextui-org/navbar'
import Logo from '@/public/img/logo.svg'
import { ROUTE } from '@/routes'
import { Skeleton } from '@nextui-org/skeleton'
import { Session } from '../Session/Session'
import { Suspense } from '@/components/other/CustomSuspense'
import { Link } from '@/components/Link'
import { ThemeSwitcher } from '@/components/other/ThemeSwitcher'
import { Nav } from './Nav'
import { NavMenu } from './NavMenu'
import { $NAV_MENU_TOGGLE } from '@/constants/elements'

export function Header() {
  return (
    <Navbar className='mx-auto w-[1600px] max-w-full' maxWidth='full'>
      <NavbarContent className='!grow-0'>
        <NavbarMenuToggle
          id={$NAV_MENU_TOGGLE}
          aria-label='Abrir/Cerrar menú'
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link href={ROUTE.HOME} className='flex items-center gap-x-2 font-bold text-inherit'>
            <Logo />
            <span>CLC</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <Suspense>
        <Nav />
      </Suspense>

      <NavbarContent justify='end'>
        <ThemeSwitcher />
        <Suspense fallback={<Skeleton className='size-8 rounded-full' />}>
          <Session />
        </Suspense>
      </NavbarContent>

      <Suspense>
        <NavMenu />
      </Suspense>
    </Navbar>
  )
}
