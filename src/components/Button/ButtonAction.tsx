'use client'

import { type CustomResponse } from '@/utilities/request/sendData/types'
import { type Options, handleResponse } from '@/utilities/handleResponse'
import { type PressEvent } from '@react-types/shared'
import { useState } from 'react'
import { Button } from '@nextui-org/button'

type Props<Args, ResponseData> = React.ComponentProps<typeof Button> & {
  action: (args: Args) => Promise<CustomResponse<ResponseData>>
  actionParameters?: Args
  actionProps?: Options<ResponseData>
}

export function ButtonAction<Args, ResponseData>(props: Props<Args, ResponseData>) {
  const { actionProps, actionParameters, action, onPress, ...restProps } = props

  const myAction = actionParameters ? () => action(actionParameters) : action

  const [isPending, setIsPending] = useState(false)

  async function handlePress(e: PressEvent) {
    onPress?.(e)
    setIsPending(true)

    const res = await myAction(actionParameters ?? ({} as Args))

    handleResponse({ res, ...actionProps })

    setIsPending(false)
  }

  return <Button {...restProps} isLoading={isPending} onPress={handlePress} />
}
