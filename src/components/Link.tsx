'use client'

import { Link as NextUiLink, type LinkProps as NextUiLinkProps } from '@heroui/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export const Link = forwardRef<HTMLAnchorElement, NextUiLinkProps>(function Link(props, ref) {
  return <NextUiLink color='foreground' as={NextLink} {...props} ref={ref} />
})
