'use client'

import { Avatar as NextuiAvatar } from '@nextui-org/react'
import { Image } from './Image'

type AvatarProps = React.ComponentProps<typeof NextuiAvatar<typeof Image>>

export function Avatar(props: AvatarProps) {
  return <NextuiAvatar ImgComponent={Image} {...props} />
}
