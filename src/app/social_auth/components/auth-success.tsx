'use client'

import { User } from '@/models/User'
import { Spinner } from '@nextui-org/spinner'
import { useEffect } from 'react'

type Props = Pick<User, 'token'>

export function AuthSuccess(props: Props) {
  const { token } = props

  useEffect(() => {
    window.opener.postMessage({ token }, window.location.origin)
  }, [token])

  return (
    <>
      <Spinner size='lg' color='current' />
      <p>Autorizando</p>
    </>
  )
}
