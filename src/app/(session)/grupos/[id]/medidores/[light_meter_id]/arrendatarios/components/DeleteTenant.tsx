'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { handleResponse } from '@/utilities/handleResponse'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants'
import { deleteTenant } from '@/controllers/TenatController/deleteTenant'
import { useParticipantContext } from '../../context/ParticipantContext'

type DeleteTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function DeleteTenantDialog(props: DeleteTenantDialogProps) {
  const { tenant, dialog } = props

  const { participant } = useParticipantContext()

  async function customHandleClick() {
    const res = await deleteTenant({ id: tenant.id, lightMeterId: participant.id })

    await handleResponse({
      res,
    })
  }

  // RENDER
  return (
    <Dialog dialog={dialog} dialogTitle='Eliminar arrendatario'>
      <DialogBody>
        <p>
          El arrendatario <b>{tenant.alias}</b> y los datos relacionados se eliminarán permanentemente
        </p>
        <p className='mt-2'>¿ Estás seguro de que quieres eliminar el arrendatario ?</p>
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