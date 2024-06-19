import NextImage from 'next/image'
import { type ComponentProps } from 'react'

type Props = ComponentProps<typeof NextImage> & {
  size?: ComponentProps<typeof NextImage>['width']
}

export function Image(props: Props) {
  const { size, src } = props

  const sizeProps = size && { width: size, height: size }
  const srcProp = src ?? undefined

  return <NextImage {...props} {...sizeProps} src={srcProp} />
}
