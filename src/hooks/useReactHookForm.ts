'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormProps } from 'react-hook-form'
import { z, ZodType } from 'zod'

export type UseReactHookFormProps<FormSchema extends ZodType> = {
  schema: FormSchema
} & Omit<UseFormProps<z.infer<FormSchema>>, 'resolver'>

export function useReactHookForm<FormSchema extends ZodType>(props: UseReactHookFormProps<FormSchema>) {
  const { schema, ...restProps } = props

  return useForm<z.infer<FormSchema>>({
    mode: 'onTouched',
    ...restProps,
    resolver: zodResolver(schema),
  })
}
