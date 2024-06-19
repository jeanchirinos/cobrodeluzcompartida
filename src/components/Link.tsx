'use client'

import { Link as NextuiLink } from '@nextui-org/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

type Props = React.ComponentProps<typeof NextuiLink>
// type Props = React.ComponentProps<typeof NextLink>

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(props, ref) {
  return <NextuiLink color='foreground' {...props} ref={ref} />
  // return <NextLink {...props} ref={ref} />
})

// export function Link(props: Props) {
//   return <NextuiLink color='foreground' {...props} />
// }
