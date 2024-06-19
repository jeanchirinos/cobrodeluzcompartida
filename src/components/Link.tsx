'use client'

import { Link as NextuiLink } from '@nextui-org/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

type Props = React.ComponentProps<typeof NextuiLink>

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(props, ref) {
  return <NextuiLink color='foreground' as={NextLink} {...props} ref={ref} />
})
