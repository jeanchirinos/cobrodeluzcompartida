'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, UseFormProps } from 'react-hook-form'
import { z, ZodType } from 'zod'

export type UseReactHookFormProps<FormSchema extends ZodType> = {
  schema: FormSchema
  defaultValuesDependency?: unknown
} & Omit<UseFormProps<z.infer<FormSchema>>, 'resolver'>

export function useReactHookForm<FormSchema extends ZodType>(props: UseReactHookFormProps<FormSchema>) {
  const { schema, defaultValuesDependency, ...restProps } = props

  // HOOKS
  const useFormHook = useForm<z.infer<FormSchema>>({
    mode: 'onTouched',
    ...restProps,
    resolver: zodResolver(schema),
  })

  const { reset } = useFormHook

  // Reset form when defaultValues change
  useEffect(() => {
    reset(restProps.defaultValues)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValuesDependency])

  return useFormHook
}
