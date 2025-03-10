'use client'

import { Chip, Tooltip } from '@heroui/react'

type Props = {
  content?: React.ReactNode
}

export function ErrorUi(props: Props) {
  const { content } = props

  const isDisabled = Boolean(!content)

  const tooltipContent = process.env.NODE_ENV === 'development' && content

  return (
    <Tooltip isDisabled={isDisabled} content={tooltipContent} className='text-danger'>
      <Chip variant='dot' color='danger'>
        Error
      </Chip>
    </Tooltip>
  )
}
