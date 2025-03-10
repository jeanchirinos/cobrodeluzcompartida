'use client'

import { Link as HeroUiLink, type LinkProps as HeroUiLinkProps } from '@heroui/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export const Link = forwardRef<HTMLAnchorElement, HeroUiLinkProps>(function Link(props, ref) {
  return <HeroUiLink color='foreground' as={NextLink} {...props} ref={ref} />
})
