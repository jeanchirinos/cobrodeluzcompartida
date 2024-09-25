'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'

import { deleteRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/deleteRentalGroupRegister/deleteRentalGroupRegister'
import { IconOptions } from '@/icons'
import { handleResponse } from '@/utilities/handleResponse'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { Spinner } from '@nextui-org/react'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'
import { ROUTE } from '@/constants/routes'

export function RentalGroupRegisterOptions() {
  const {
    data: { rentalGroupRegister },
  } = useGetRentalGroupRegister()

  const { push } = useRouter()

  const { trigger, isMutating } = useSWRMutation('DELETE', async () => {
    if (!rentalGroupRegister) return

    const res = await deleteRentalGroupRegister({ id: rentalGroupRegister.billData.id })

    await handleResponse({
      res,
      onSuccess: async () => {
        push(ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId: rentalGroupRegister.billData.rental_group_id }))
      },
    })
  })

  return (
    <Dropdown
      shouldBlockScroll={false}
      classNames={{
        content: 'min-w-fit',
      }}
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <Button size='sm' variant='light' isIconOnly aria-label='Opciones'>
          <IconOptions />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Opciones'
        classNames={{
          list: '*:pr-8',
        }}
      >
        <DropdownItem key='reset' color='danger' onPress={() => trigger()}>
          <div className='flex items-center gap-x-2'>
            <span>Eliminar registro</span>
            {isMutating && <Spinner color='current' size='sm' />}
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
