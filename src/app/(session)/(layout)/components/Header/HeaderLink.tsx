'use client'
import { Link } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'
import { cnx } from '@/lib/utils'
import { NavbarItem } from '@nextui-org/navbar'

type Props = React.ComponentProps<typeof Link> & {
  hrefPattern?: string
}

export const HeaderLink = forwardRef<HTMLAnchorElement, Props>(function HeaderLink(props, ref) {
  const { hrefPattern, ...restProps } = props

  const pathname = usePathname()

  const isActive = () => {
    if (hrefPattern) {
      return Boolean(pathname.match(hrefPattern))
    }

    return pathname === props.href
  }

  return (
    <NavbarItem isActive={isActive()}>
      <Link
        {...restProps}
        ref={ref}
        className={cnx(props.className, isActive() && 'text-secondary')}
      />
    </NavbarItem>
  )
})
