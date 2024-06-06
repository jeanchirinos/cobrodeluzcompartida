import { Input as NextUiInput } from '@nextui-org/input'
import { type ComponentProps, forwardRef } from 'react'

type Props = ComponentProps<typeof NextUiInput>

export const Input = forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
  return <NextUiInput placeholder=' ' labelPlacement='outside' {...props} ref={ref} />
})
