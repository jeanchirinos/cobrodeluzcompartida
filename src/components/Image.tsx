import NextImage from 'next/image'
// import { forwardRef } from 'react'

type Props = React.ComponentProps<typeof NextImage>

export function Image(props: Props) {
  return <NextImage {...props} src={props.src ?? undefined} />
}

// export const Image = forwardRef<HTMLImageElement, Props>(function Image(props, ref) {
//   return <NextImage {...props} src={props.src ?? undefined} ref={ref} />
// })
