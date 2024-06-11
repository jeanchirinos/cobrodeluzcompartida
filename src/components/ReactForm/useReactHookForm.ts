'use client'

import { handleResponse } from '@/utilities/handleResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormProps } from 'react-hook-form'
import { ZodType } from 'zod'

export type UseReactHookFormProps<T extends FieldValues> = {
  schema: ZodType<T>
  action?: (data: T) => any
  actionProps?: Parameters<typeof handleResponse>[1]
} & Omit<UseFormProps<T>, 'resolver'>

export function useReactHookForm<T extends FieldValues>(props: UseReactHookFormProps<T>) {
  const { schema, action, actionProps, ...restProps } = props

  const useFormHook = useForm<T>({
    mode: 'onTouched',
    ...restProps,
    resolver: zodResolver(schema),
  })

  // Reset form when defaultValues change
  useEffect(() => {
    useFormHook.reset(restProps.defaultValues as T)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restProps.defaultValues])

  const { isValid, isSubmitting, isDirty } = useFormHook.formState

  const disabled = !isValid || isSubmitting || !isDirty

  const onSubmit: SubmitHandler<T> = async data => {
    if (!action) return
    if (disabled) return

    const res = await action(data)

    handleResponse(res, actionProps)
  }

  return {
    useFormHook: { ...useFormHook, onSubmit: useFormHook.handleSubmit(onSubmit) },
  }
}
