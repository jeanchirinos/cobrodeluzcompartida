'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Button } from '@nextui-org/button'
import { Google } from './Google'
import { Login } from './Login'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'

export function UserNotLogged() {
  if (process.env.NODE_ENV === 'production') {
    return <Google />
  }

  return (
    <Popover>
      {/* @ts-ignore */}
      <PopoverTrigger id={$BUTTON_LOGIN_ID} as={Button} color='primary' variant='flat'>
        Iniciar sesión
      </PopoverTrigger>
      <PopoverContent className='right-0 flex w-80 flex-col gap-y-2 overflow-hidden bg-content1 px-5 py-3 shadow-md'>
        <div className='max-w-sm space-y-2'>
          <Login />
        </div>
      </PopoverContent>
    </Popover>
  )
}
