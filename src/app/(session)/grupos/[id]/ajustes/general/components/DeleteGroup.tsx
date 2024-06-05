'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { deleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup'
import { Button } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { handleResponse } from '@/utilities/handleResponse'
import { ROUTE } from '@/routes'
import { useRentalGroupContext } from '../../../context/RentalGroupContext'

export function DeleteGroup() {
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()

  const { rentalGroup } = useRentalGroupContext()
  const deleteRentalGroupDialog = useDialog()

  async function customHandleClick() {
    const res = await deleteRentalGroup({ id })

    handleResponse(res, {
      showSuccessToast: true,
      onSuccess() {
        push(ROUTE.GROUPS.INDEX)
      },
    })
  }

  // RENDER
  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar grupo</h3>
        <p>El proyecto se eliminará permanentemente, incluyendo sus registros.</p>
      </div>
      <Button
        onClick={deleteRentalGroupDialog.open}
        className='w-fit'
        color='danger'
        variant='flat'
      >
        Eliminar
      </Button>
      <Dialog dialog={deleteRentalGroupDialog} dialogTitle='Eliminar grupo'>
        <DialogBody>
          <p>
            El grupo <b>{rentalGroup.name}</b> y sus registros se eliminarán permanentemente
          </p>
          <p className='mt-2'>¿ Estás seguro de que quieres eliminar el grupo ?</p>
        </DialogBody>
        <DialogFooter
          dialog={deleteRentalGroupDialog}
          variant='2'
          customHandleClick={customHandleClick}
          mainButtonProps={{
            color: 'danger',
            children: 'Sí, Eliminar',
          }}
        />
      </Dialog>
    </section>
  )
}
