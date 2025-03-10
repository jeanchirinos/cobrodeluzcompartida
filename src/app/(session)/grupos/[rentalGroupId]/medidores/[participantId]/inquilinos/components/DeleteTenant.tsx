'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { useDeleteTenant } from '@/controllers/TenatController/deleteTenant/useDeleteTenant'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants/getTenants'
import { Button } from '@heroui/react'

type DeleteTenantDialogProps = { tenant: ResponseGetTenants[0]; dialog: UseDialog }

export function DeleteTenantDialog(props: DeleteTenantDialogProps) {
  const { tenant, dialog } = props

  const { mutate, isPending } = useDeleteTenant()

  function handleDelete() {
    mutate({ id: tenant.id }, { onSuccess: dialog.close })
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

      <DialogFooter>
        <Button onPress={dialog.close} variant='flat'>
          Cancelar
        </Button>
        <Button color='danger' isLoading={isPending} onPress={handleDelete}>
          Sí, Eliminar
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
