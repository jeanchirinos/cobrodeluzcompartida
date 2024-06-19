'use client'

import { Button } from '@nextui-org/button'
import { Options } from '@/hooks/useFormAction'
import { CustomResponse } from '@/utilities/request/sendData/types'
import { useState } from 'react'
import { handleResponse } from '@/utilities/handleResponse'

type Props<Args, ResponseData> = React.ComponentProps<typeof Button> & {
  innerRef?: React.Ref<HTMLButtonElement>
  action: (args: Args) => Promise<CustomResponse<ResponseData>>
  actionParameters?: Args
  actionProps?: Options<ResponseData>
}

export function ButtonAction<Args, ResponseData>(props: Props<Args, ResponseData>) {
  const { innerRef, actionProps, actionParameters, action, onClick, ...restProps } = props

  const myAction = actionParameters ? () => action(actionParameters) : action

  const [isPending, setIsPending] = useState(false)

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    setIsPending(true)
    const res = await myAction(actionParameters ?? ({} as Args))

    handleResponse({ res, ...actionProps })

    setIsPending(false)
  }

  return <Button {...restProps} isLoading={isPending} ref={innerRef} onClick={handleClick} />
}
