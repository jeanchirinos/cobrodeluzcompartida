import { Input as NextUiInput } from '@nextui-org/input'

type Props = React.ComponentProps<typeof NextUiInput> & {
  innerRef?: React.Ref<HTMLInputElement>
}

export function Input(props: Props) {
  const { innerRef, ...componentProps } = props

  return <NextUiInput labelPlacement='outside' {...componentProps} ref={innerRef} />
}
