'use client'

import { Button } from '@nextui-org/button'
import { useFormAction } from '@/hooks/useFormAction'
import React from 'react'

type Props = React.ComponentProps<typeof Button> & {
  innerRef?: React.Ref<HTMLButtonElement>
  action: Parameters<typeof useFormAction>[0]
  actionProps?: Parameters<typeof useFormAction>[1]
}

export function ButtonAction(props: Props) {
  const { innerRef, actionProps, action, onClick, ...restProps } = props

  const { formAction, isPending, setIsPending } = useFormAction(action, actionProps)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    setIsPending(true)
    formAction()
  }

  return <Button {...restProps} isLoading={isPending} ref={innerRef} onClick={handleClick} />
}
