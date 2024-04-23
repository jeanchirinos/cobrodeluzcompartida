import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import Link from 'next/link'
import Logo from '@/public/img/logo.svg'
import { ROUTE } from '@/routes'
import { Skeleton } from '@nextui-org/skeleton'
import { Session } from './Session'
import { Suspense } from '@/components/other/CustomSuspense'

export function Header() {
  return (
    <Navbar className='w-[1600px] mx-auto max-w-full' maxWidth='full'>
      <NavbarBrand className='grow-0'>
        <Link href={ROUTE.HOME} className='flex gap-x-2 items-center'>
          <Logo />
          <span className='font-bold text-inherit'>CCSEC</span>
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4' justify='start'>
        <NavbarItem>
          <Link color='foreground' href={ROUTE.CALCULATE}>
            Calcular
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Suspense fallback={<Skeleton className='size-8 rounded-full' />}>
            <Session />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
