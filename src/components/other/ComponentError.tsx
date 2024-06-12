'use client'

import { Chip, Tooltip } from '@nextui-org/react'
import { ErrorComponent } from 'next/dist/client/components/error-boundary'

export function ErrorUiComponent(props: React.ComponentProps<ErrorComponent>) {
  return (
    <Tooltip content={props.error.message} className='text-danger'>
      <Chip variant='dot' color='danger'>
        Error
      </Chip>
    </Tooltip>
  )
}
