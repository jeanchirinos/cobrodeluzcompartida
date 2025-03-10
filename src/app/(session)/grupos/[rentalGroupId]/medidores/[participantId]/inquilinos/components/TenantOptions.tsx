'use client'

import { IconOptions } from '@/icons'
import { DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from '@heroui/dropdown'
import { Button } from '@heroui/button'
import { useDialog } from '@/components/Dialog/useDialog'
import { Dialog } from '@/components/Dialog/Dialog'
import { ShareTenantDialog } from './ShareTenant'
import { DeleteTenantDialog } from './DeleteTenant'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants/getTenants'
import { UpdateTenantDialog } from './UpdateTenant'

type TenantOptionsProps = { tenant: ResponseGetTenants[0] }

export function TenantOptions(props: TenantOptionsProps) {
  const editDialog = useDialog()
  const shareDialog = useDialog()
  const deleteDialog = useDialog()

  return (
    <>
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content: 'min-w-fit',
        }}
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
          disabledKeys={['share']}
        >
          <DropdownItem key='edit' onPress={editDialog.open}>
            Editar
          </DropdownItem>
          <DropdownItem key='share' onPress={shareDialog.open}>
            Compartir registros
          </DropdownItem>
          <DropdownItem
            key='delete'
            onPress={deleteDialog.open}
            variant='flat'
            color='danger'
            className='text-danger-500'
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dialog dialog={editDialog} dialogTitle='Editar inquilino'>
        <UpdateTenantDialog tenant={props.tenant} dialog={editDialog} />
      </Dialog>

      <Dialog dialog={shareDialog} dialogTitle='Compartir registros a inquilino'>
        <ShareTenantDialog tenant={props.tenant} dialog={shareDialog} />
      </Dialog>

      <DeleteTenantDialog tenant={props.tenant} dialog={deleteDialog} />
    </>
  )
}
