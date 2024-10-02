import { Button } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'

type Props = React.ComponentProps<typeof Button> & {
  // TODOl: Remove onSubmit from here
  useFormHook: UseFormReturn<any> & { onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => Promise<void> }
  isPending?: boolean
}

export function HookFormButton(props: Props) {
  const { useFormHook, isDisabled, isPending = false, ...restProps } = props
  const { isValid, isSubmitting, isDirty } = useFormHook.formState

  const disabled = !isValid || isSubmitting || Boolean(isDisabled) || !isDirty || isPending

  return (
    <Button type='submit' isLoading={isSubmitting || isPending} isDisabled={disabled} color='primary' {...restProps} />
  )
}
