import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import Logo from '@/public/img/logo.svg'
import { ROUTE } from '@/routes'
import { Skeleton } from '@nextui-org/skeleton'
import { Session } from '../Session/Session'
import { Suspense } from '@/components/other/CustomSuspense'
import { HeaderLink } from './HeaderLink'
import { Link } from '@/components/Link'
import { ThemeSwitcher } from '@/components/other/ThemeSwitcher'
import { getSession } from '@/controllers/AuthController/getSession'

export async function Header() {
  const session = await getSession()

  return (
    <Navbar className='w-[1600px] mx-auto max-w-full' maxWidth='full'>
      <NavbarContent className='!grow-0'>
        <NavbarMenuToggle aria-label='Abrir/Cerrar menú' className='sm:hidden' />
        <NavbarBrand>
          <Link href={ROUTE.HOME} className='flex gap-x-2 items-center font-bold text-inherit'>
            <Logo />
            <span>CLC</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-x-4' justify='start'>
        {session ? (
          <HeaderLink size='sm' href={ROUTE.GROUPS.INDEX}>
            Grupos
          </HeaderLink>
        ) : (
          <HeaderLink size='sm' href={ROUTE.CALCULATE}>
            Calcular
          </HeaderLink>
        )}
      </NavbarContent>

      <NavbarContent justify='end'>
        <ThemeSwitcher />
        <Suspense fallback={<Skeleton className='size-8 rounded-full' />}>
          <Session />
        </Suspense>
      </NavbarContent>

      <NavbarMenu className='!h-fit'>
        {session ? (
          <NavbarMenuItem>
            <HeaderLink size='sm' href={ROUTE.GROUPS.INDEX}>
              Grupos
            </HeaderLink>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <HeaderLink size='sm' href={ROUTE.CALCULATE}>
              Calcular
            </HeaderLink>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  )
}
