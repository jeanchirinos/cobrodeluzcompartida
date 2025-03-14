'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { ROUTE } from '@/constants/routes'
import { useDeleteRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/deleteRentalGroupRegister/useDeleteRentalGroupRegister'
import { IconOptions } from '@/icons'
import { Button } from '@heroui/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Spinner } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ErrorUi } from '@/components/other/ComponentError'
import { toast } from 'sonner'

export function RentalGroupRegisterOptions() {
  const { data, isPending, isError } = useGetRentalGroupRegister()

  const { push } = useRouter()

  const { mutate, isPending: isMutating } = useDeleteRentalGroupRegister()

  if (isPending) return <></>
  if (isError) return <ErrorUi />
  if (!data) return <></>

  const { rentalGroupRegister } = data

  async function handleDelete() {
    mutate(
      { id: rentalGroupRegister.billData.id },
      {
        onSuccess(data) {
          toast.success(data.msg)
          push(ROUTE.GROUPS.REGISTERS.INDEX({ rentalGroupId: rentalGroupRegister.billData.rental_group_id }))
        },
      },
    )
  }

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
            {isMutating && <Spinner color='current' size='sm' />}
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
