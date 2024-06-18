'use client'

import { Button } from '@nextui-org/button'
import { Options, useFormAction } from '@/hooks/useFormAction'
import { CustomResponse } from '@/utilities/request/sendData/types'

type Props<Args, ResponseData> = React.ComponentProps<typeof Button> & {
  innerRef?: React.Ref<HTMLButtonElement>
  action: (args: Args) => Promise<CustomResponse<ResponseData>>
  actionParameters?: Args
  // actionProps?: Options<Awaited<ReturnType<T['data']>>>
  actionProps?: Options<ResponseData>
}

// convert type promise in type function
// type PromiseType<T> = T extends Promise<infer U> ? U : T

// export function ButtonAction<T extends (...args: any[]) => Responsea>(props: Props<T>) {
export function ButtonAction<Args, ResponseData>(props: Props<Args, ResponseData>) {
  const { innerRef, actionProps, actionParameters, action, onClick, ...restProps } = props

  const myAction = actionParameters ? () => action(actionParameters) : action

  const { formAction, isPending, setIsPending } = useFormAction(myAction, actionProps)

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    setIsPending(true)
    formAction()
  }

  return <Button {...restProps} isLoading={isPending} ref={innerRef} onClick={handleClick} />
}
