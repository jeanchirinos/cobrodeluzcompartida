import NextImage, { type ImageProps as NextImageProps } from 'next/image'

type ImageProps = NextImageProps & {
  size?: NextImageProps['width']
}

export function Image(props: ImageProps) {
  const { size, src } = props

  const sizeProps = size && { width: size, height: size }
  const srcProp = src ?? undefined

  return <NextImage {...props} {...sizeProps} src={srcProp} />
}
