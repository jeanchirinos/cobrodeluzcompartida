'use client'
import { Link } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { cnx } from '@/lib/utils'
import { NavbarItem, NavbarMenuItem } from '@heroui/navbar'
import { ComponentProps, ComponentType } from 'react'
import { $NAV_MENU_TOGGLE } from '@/constants/elements'

//
type LinkItemProps = ComponentProps<typeof Link> & {
  isActive: boolean
}

function LinkItem(props: LinkItemProps) {
  const { isActive, ...restProps } = props

  return (
    <Link size='sm' {...restProps} className={cnx(props.className, isActive && 'text-secondary')} />
  )
}

//
type WrappedComponentType = ComponentType<NavItemWithoutActiveProps>
type WithActiveProps = ComponentProps<typeof Link> & { hrefPattern?: RegExp }

function withActive(WrappedComponent: WrappedComponentType) {
  const WithActive = (props: WithActiveProps) => {
    const { hrefPattern, ...restProps } = props

    const pathname = usePathname()

    const isActive = () => {
      if (hrefPattern) return hrefPattern.test(pathname)

      return pathname === props.href
    }

    return <WrappedComponent {...restProps} isActive={isActive()} />
  }

  return WithActive
}

//
type NavItemWithoutActiveProps = ComponentProps<typeof Link> & {
  isActive: boolean
}

function NavItemWithoutActive(props: NavItemWithoutActiveProps) {
  const { isActive, ...restProps } = props

  return (
    <NavbarItem isActive={isActive}>
      <LinkItem {...restProps} isActive={isActive} />
    </NavbarItem>
  )
}

function NavMenuItemWithoutActive(props: NavItemWithoutActiveProps) {
  const { isActive, ...restProps } = props

  function closeMenu() {
    document.getElementById($NAV_MENU_TOGGLE)?.click()
  }

  return (
    <NavbarMenuItem isActive={isActive}>
      <LinkItem {...restProps} isActive={isActive} onClick={closeMenu} />
    </NavbarMenuItem>
  )
}

//
export const HeaderLinkNavItem = withActive(NavItemWithoutActive)
export const HeaderLinkNavMenuItem = withActive(NavMenuItemWithoutActive)
