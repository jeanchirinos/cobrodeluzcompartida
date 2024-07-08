'use client'

import { type ComponentType, type ComponentProps } from 'react'
import { type FieldError, type UseFormReturn, get } from 'react-hook-form'
import { Input, InputProps } from '../Input'

type WithHookFormProps<T extends ComponentType, Y extends UseFormReturn> = Omit<ComponentProps<T>, 'name'> & {
  useFormHook: Y
  name: Parameters<Y['register']>['0']
  registerOptions?: Parameters<Y['register']>['1']
}

export function withHookForm<T extends ComponentType>(WrappedComponent: T) {
  function WithHookForm<Y extends UseFormReturn<any>>(props: WithHookFormProps<T, Y>) {
    const { useFormHook, name, registerOptions, ...restProps } = props

    // "watch" is necessary to update the value of the "NextuiInput" component when for example "reseting the field", if possible this shouldn't be used

    const { watch, register } = useFormHook

    const error: FieldError | undefined = get(useFormHook.formState.errors, name)

    const hookFormProps = {
      ...register(name, registerOptions),
      errorMessage: error?.message,
      isInvalid: Boolean(error),
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

// export const CustomInput = withHookForm(Input)

//

type UseHookFormInputProps<T extends UseFormReturn> = {
  useFormHook: T
  name: Parameters<T['register']>['0']
  registerOptions?: Parameters<T['register']>['1']
}

function useHookFormInput<T extends UseFormReturn>(props: UseHookFormInputProps<T>) {
  const { useFormHook, name, registerOptions } = props

  // "watch" is necessary to update the value of the "NextuiInput" component when for example "reseting the field", if possible this shouldn't be used

  const { watch, register } = useFormHook

  const error: FieldError | undefined = get(useFormHook.formState.errors, name)

  const hookFormProps = {
    ...register(name, registerOptions),
    errorMessage: error?.message,
    isInvalid: Boolean(error),
    value: watch(name),
  }

  return { hookFormProps }
}

type CustomInputProps<T extends UseFormReturn> = Omit<InputProps, 'name'> & UseHookFormInputProps<T>

export function CustomInput<T extends UseFormReturn<any>>(props: CustomInputProps<T>) {
  const { name, registerOptions, useFormHook, ...restProps } = props

  const { hookFormProps } = useHookFormInput({ useFormHook, name, registerOptions })

  return <Input {...restProps} {...hookFormProps} />
}
