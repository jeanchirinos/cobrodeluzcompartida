'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { useDeleteTenant } from '@/controllers/TenatController/deleteTenant/useDeleteTenant'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants/getTenants'
import { handleToast } from '@/utilities/handleToast'

type DeleteTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function DeleteTenantDialog(props: DeleteTenantDialogProps) {
  const { tenant, dialog } = props

  const { trigger } = useDeleteTenant()

  async function customHandleClick() {
    const res = await trigger({ id: tenant.id })

    handleToast({
      res,
    })
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
