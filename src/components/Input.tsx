import { Input as NextUiInput } from '@nextui-org/input'
import { forwardRef } from 'react'

// type Props = React.ComponentProps<typeof NextUiInput> & {
//   innerRef?: React.Ref<HTMLInputElement>
// }
type Props = React.ComponentProps<typeof NextUiInput>

// export function Input(props: Props) {
//   const { innerRef, ...componentProps } = props

//   return <NextUiInput labelPlacement='outside' {...componentProps} ref={innerRef} placeholder=' ' />
// }

export const Input = forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
  return <NextUiInput placeholder=' ' labelPlacement='outside' {...props} ref={ref} />
})
