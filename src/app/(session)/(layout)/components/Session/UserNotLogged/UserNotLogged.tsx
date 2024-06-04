'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Google } from './Google'
import { Login } from './Login'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'

export function UserNotLogged() {
  if (process.env.NODE_ENV === 'production') {
    return <Google />
  }

  return (
    <Popover>
      <PopoverTrigger id={$BUTTON_LOGIN_ID} color='primary' variant='flat'>
        <span className='max-sm:hidden'>Iniciar sesión</span>
        <span className='sm:hidden'>Ingresar</span>
      </PopoverTrigger>
      <PopoverContent className='flex w-80 flex-col gap-y-2 bg-content1 px-5 py-4'>
        <Login />
      </PopoverContent>
    </Popover>
  )
}
