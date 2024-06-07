'use client'

import { Button } from '@nextui-org/button'
import { useFormAction } from '@/hooks/useFormAction'
// import { useState } from 'react'
import { handleResponse } from '@/utilities/handleResponse'

type Props<T extends (...args: any) => any> = React.ComponentProps<typeof Button> & {
  innerRef?: React.Ref<HTMLButtonElement>
  // action: Parameters<typeof useFormAction>[0]
  // actionProps?: Parameters<typeof useFormAction>[1]
  action: T
  actionParameters?: Parameters<T>[0]
  actionProps?: Parameters<typeof handleResponse>[1]
}

export function ButtonAction<T extends (...args: any) => any>(props: Props<T>) {
  const { innerRef, actionProps, actionParameters, action, onClick, ...restProps } = props

  const myAction = actionParameters ? () => action(actionParameters) : action

  const { formAction, isPending, setIsPending } = useFormAction(myAction, actionProps)
  // const [isPending, setIsPending] = useState(false)

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    setIsPending(true)

    formAction()
    // await formAction()
    // const res = await action()
    // handleResponse(res, actionProps)
    // setIsPending(false)
  }

  return <Button {...restProps} isLoading={isPending} ref={innerRef} onClick={handleClick} />
}
