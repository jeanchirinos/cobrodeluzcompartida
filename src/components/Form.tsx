'use client'

import { ComponentProps } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit: SubmitHandler<any>
  useFormHook: UseFormReturn<any>
}

export function Form(props: Props) {
  const { useFormHook, onSubmit, ...restProps } = props
  const { handleSubmit } = useFormHook

  return <form {...restProps} onSubmit={handleSubmit(onSubmit)} />
}
