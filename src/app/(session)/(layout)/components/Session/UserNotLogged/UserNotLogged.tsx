'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Google } from './Google'
import { Login } from './Login'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { Tab, Tabs } from '@nextui-org/react'

export function UserNotLogged() {
  return (
    <>
      <Popover>
        <PopoverTrigger id={$BUTTON_LOGIN_ID} color='primary' variant='flat'>
          <span className='max-sm:hidden'>Iniciar sesión</span>
          <span className='sm:hidden'>Ingresar</span>
        </PopoverTrigger>
        <PopoverContent className='flex w-80 flex-col gap-y-2 overflow-hidden bg-content1 px-5 py-3 shadow-md'>
          <div className='flex max-w-sm flex-col gap-y-2'>
            <Google />
            <Tabs fullWidth disabledKeys={['register']}>
              <Tab key='login' title='Login'>
                <Login />
              </Tab>
              <Tab key='register' title='Registro'>
                {/* <Register /> */}
              </Tab>
            </Tabs>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
