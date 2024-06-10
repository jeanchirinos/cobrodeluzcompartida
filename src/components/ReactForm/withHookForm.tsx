'use client'

import type { ComponentType, ComponentProps } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Input } from '../Input'

type WithHookFormProps<T extends ComponentType, Y extends UseFormReturn> = Omit<
  ComponentProps<T>,
  'name'
> & {
  useFormHook: Y
  name: Parameters<Y['register']>['0']
  registerOptions?: Parameters<Y['register']>['1']
}

export function withHookForm<T extends ComponentType>(WrappedComponent: T) {
  function WithHookForm<Y extends UseFormReturn<any>>(props: WithHookFormProps<T, Y>) {
    const { useFormHook, name, registerOptions, ...restProps } = props

    // "watch" is necessary to update the value of the "NextuiInput" component when for example "reseting the field"

    const {
      watch,
      register,
      formState: { errors },
    } = useFormHook

    const hookFormProps = {
      ...register(name, registerOptions),
      errorMessage: errors[name]?.message,
      isInvalid: errors[name],
      value: watch(name),
    }

    const componentProps = {
      ...hookFormProps,
      ...restProps,
    } as any

    return <WrappedComponent {...componentProps} />
  }

  return WithHookForm
}

export const CustomInput = withHookForm(Input)
