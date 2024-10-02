'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'

import { ROUTE } from '@/constants/routes'
import { useDeleteRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/deleteRentalGroupRegister/useDeleteRentalGroupRegister'
import { IconOptions } from '@/icons'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function RentalGroupRegisterOptions() {
  const { data } = useGetRentalGroupRegister()

  const { push } = useRouter()

  const { mutate, isPending } = useDeleteRentalGroupRegister()

  if (!data) return <></>
  const { rentalGroupRegister } = data

  async function handleDelete() {
    if (!rentalGroupRegister) return

    mutate(
      { id: rentalGroupRegister.billData.id },
      {
        onSuccess() {
          push(ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId: rentalGroupRegister.billData.rental_group_id }))
        },
      },
    )
  }

  if (!rentalGroupRegister) return <></>

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
        <DropdownItem key='reset' color='danger' onPress={handleDelete}>
          <div className='flex items-center gap-x-2'>
            <span>Eliminar registro</span>
            {isPending && <Spinner color='current' size='sm' />}
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
