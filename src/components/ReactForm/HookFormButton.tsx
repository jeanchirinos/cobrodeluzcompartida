import { Button } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'

type Props = React.ComponentProps<typeof Button> & {
  useFormHook: UseFormReturn<any> & { onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void }
}

export function HookFormButton(props: Props) {
  const { useFormHook, isDisabled, ...restProps } = props
  const { isValid, isSubmitting, isDirty } = useFormHook.formState

  const disabled = !isValid || isSubmitting || Boolean(isDisabled) || !isDirty

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
