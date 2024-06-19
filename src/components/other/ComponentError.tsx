'use client'

import { Chip, Tooltip } from '@nextui-org/react'
import { ErrorComponent } from 'next/dist/client/components/error-boundary'

export function ErrorUiComponent(props: React.ComponentProps<ErrorComponent>) {
  const content = process.env.NODE_ENV === 'development' && props.error.message

  return (
    <Tooltip content={content} className='text-danger'>
      <Chip variant='dot' color='danger'>
        Error
      </Chip>
    </Tooltip>
  )
}
