'use client'

import { handleResponse, Options } from '@/utilities/handleResponse'
import { CustomResponse } from '@/utilities/request/sendData/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { SubmitHandler, useForm, UseFormProps } from 'react-hook-form'
import { z, ZodType } from 'zod'

export type UseReactHookFormProps<ActionArgs, ResponseData, FormSchema extends ZodType> = {
  //! Required if needs response type for options
  action?: (data: ActionArgs) => Promise<CustomResponse<ResponseData>>
  actionProps?: Options<ResponseData>
  schema: FormSchema
  //! submitActionFn is required only if FormSchema is not equal to action schema OR action function args are different from FormSchema
  submitActionFn?: (data: z.infer<FormSchema>) => Promise<CustomResponse<ResponseData>>
  defaultValuesDependency?: unknown
} & Omit<UseFormProps<z.infer<FormSchema>>, 'resolver'>

export function useReactHookForm<ActionArgs, ResponseData, FormSchema extends ZodType>(
  props: UseReactHookFormProps<ActionArgs, ResponseData, FormSchema>,
) {
  const { schema, action, submitActionFn, actionProps, defaultValuesDependency, ...restProps } = props

  // HOOKS
  const useFormHook = useForm<z.infer<FormSchema>>({
    mode: 'onTouched',
    ...restProps,
    resolver: zodResolver(schema),
  })

  const { formState, handleSubmit, reset } = useFormHook
  const { isValid, isSubmitting, isDirty } = formState

  // EFFECTS

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValuesDependency) return

    reset(restProps.defaultValues)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValuesDependency])

  // VALUES
  const disabled = !isValid || isSubmitting || !isDirty

  // FUNCTIONS
  const onSubmit: SubmitHandler<z.infer<FormSchema>> = async data => {
    if (disabled) return

    const res = (await submitActionFn?.(data)) ?? (await action?.(data))

    if (!res) return

    await handleResponse({ res, ...actionProps })
  }

  // RETURN
  return {
    useFormHook: { ...useFormHook, onSubmit: handleSubmit(onSubmit) },
  }
}
