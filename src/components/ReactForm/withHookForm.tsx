'use client'

import { type ComponentType, type ComponentProps, forwardRef } from 'react'
import type { UseFormRegisterReturn, UseFormReturn } from 'react-hook-form'
import { Input } from '../Input'

type WrappedComponentType<T extends ComponentType> = ComponentType<ComponentProps<T>>

type WithHookFormProps<T extends ComponentType> = ComponentProps<T> & {
  useFormHook: UseFormReturn<any>
  register: UseFormRegisterReturn
}

export function withHookForm<T extends ComponentType>(WrappedComponent: WrappedComponentType<T>) {
  // eslint-disable-next-line react/display-name
  return forwardRef((props: WithHookFormProps<T>, ref) => {
    const { useFormHook, register, ...restProps } = props

    const {
      watch,
      formState: { errors },
    } = useFormHook

    const { name } = register

    const hookFormProps = {
      ...register,
      errorMessage: errors[name]?.message,
      isInvalid: errors[name],
      value: watch(name),
    }

    const componentProps = {
      ...hookFormProps,
      ...restProps,
    } as ComponentProps<T>

    return <WrappedComponent {...componentProps} />
  })
}
// const WithHookForm = (props: WithHookFormProps<T>) => {
//   const { useFormHook, register, ...restProps } = props

//   const {
//     watch,
//     formState: { errors },
//   } = useFormHook

//   const { name } = register

//   const hookFormProps = {
//     ...register,
//     errorMessage: errors[name]?.message,
//     isInvalid: errors[name],
//     value: watch(name),
//   }

//   const componentProps = {
//     ...hookFormProps,
//     ...restProps,
//   } as ComponentProps<T>

//   return <WrappedComponent {...componentProps} />
// }

// return WithHookForm
// }

export const CustomInput = withHookForm<typeof Input>(Input)
