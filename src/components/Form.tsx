'use client'

import { useFormAction } from '@/hooks/useFormAction'

type Props = React.ComponentProps<'form'> & {
  actionProps?: Parameters<typeof useFormAction>[1]
}

export function Form(props: Props) {
  const { actionProps, action } = props

  const { formAction } = useFormAction(action, actionProps)

  const actionProp = action ? formAction : undefined

  return <form {...props} action={actionProp} />
}
