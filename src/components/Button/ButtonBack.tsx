'use client'

import { IconArrowBack } from '@/icons'
import { Button } from '@heroui/button'
import { useRouter } from 'next/navigation'
import { ButtonLink } from './ButtonLink'

type ButtonBackProps = {
  href?: string
}

export function ButtonBack(props: ButtonBackProps) {
  const { href } = props

  const { back } = useRouter()

  const buttonProps: React.ComponentProps<typeof Button<any>> = {
    isIconOnly: true,
    size: 'sm',
    variant: 'flat',
    radius: 'full',
  }

  if (href) {
    return (
      <ButtonLink {...buttonProps} href={href}>
        <IconArrowBack />
      </ButtonLink>
    )
  }

  return (
    <Button {...buttonProps} onPress={back}>
      <IconArrowBack />
    </Button>
  )
}
