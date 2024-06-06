import { Button } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'

type Props = React.ComponentProps<typeof Button> & {
  useFormHook: UseFormReturn<any>
}

export function HookFormButton(props: Props) {
  const { useFormHook, isDisabled, ...restProps } = props
  const { isValid, isSubmitting } = useFormHook.formState

  const disabled = !isValid || isSubmitting || isDisabled

  return (
    <Button
      type='submit'
      isDisabled={disabled}
      isLoading={isSubmitting}
      color='primary'
      {...restProps}
    />
  )
}
