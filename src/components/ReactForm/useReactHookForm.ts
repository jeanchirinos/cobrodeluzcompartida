'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm, UseFormProps } from 'react-hook-form'
import { ZodType } from 'zod'

type Props<T extends FieldValues> = {
  schema: ZodType<T>
} & Omit<UseFormProps<T>, 'resolver'>

export function useReactHookForm<T extends FieldValues>(props: Props<T>) {
  const { schema, ...restProps } = props

  const useFormHook = useForm<T>({
    mode: 'onTouched',
    ...restProps,
    resolver: zodResolver(schema),
  })

  return {
    useFormHook,
  }
}
