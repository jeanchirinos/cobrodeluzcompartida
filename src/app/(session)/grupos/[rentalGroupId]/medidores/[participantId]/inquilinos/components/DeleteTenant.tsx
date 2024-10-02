'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { useDeleteTenant } from '@/controllers/TenatController/deleteTenant/useDeleteTenant'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants/getTenants'

type DeleteTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function DeleteTenantDialog(props: DeleteTenantDialogProps) {
  const { tenant, dialog } = props

  const { mutateAsync } = useDeleteTenant()

  async function customHandleClick() {
    try {
      await mutateAsync({ id: tenant.id })
    } catch (error) {}
  }

  // RENDER
  return (
    <Dialog dialog={dialog} dialogTitle='Eliminar inquilino'>
      <DialogBody>
        <p>
          El inquilino <b>{tenant.alias}</b> y los datos relacionados se eliminarán permanentemente
        </p>
        <p className='mt-2'>¿ Estás seguro de que quieres eliminar el inquilino ?</p>
      </DialogBody>
      <DialogFooter
        dialog={dialog}
        variant='2'
        customHandleClick={customHandleClick}
        mainButtonProps={{
          color: 'danger',
          children: 'Sí, Eliminar',
        }}
      />
    </Dialog>
  )
}
