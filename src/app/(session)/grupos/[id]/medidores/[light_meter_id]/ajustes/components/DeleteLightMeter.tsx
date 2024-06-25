'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { deleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup'
import { Button } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { handleResponse } from '@/utilities/handleResponse'
import { ROUTE } from '@/constants/routes'
import { useRentalGroupContext } from '@/app/(session)/grupos/[id]/context/RentalGroupContext'

export function DeleteLightMeter() {
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()

  const { rentalGroup } = useRentalGroupContext()
  const deleteRentalGroupDialog = useDialog()

  async function customHandleClick() {
    const res = await deleteRentalGroup({ id: Number(id) })

    handleResponse({
      res,
      onSuccess() {
        push(ROUTE.GROUPS.INDEX)
      },
    })
  }

  // RENDER
  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar medidor</h3>
        <p>El medidor se eliminará permanentemente, incluyendo sus usuarios y registros en los cuales participó.</p>
      </div>
      <Button onClick={deleteRentalGroupDialog.open} className='w-fit' color='danger' variant='flat'>
        Eliminar
      </Button>
      <Dialog dialog={deleteRentalGroupDialog} dialogTitle='Eliminar medidor'>
        <DialogBody>
          <p>
            El medidor <b>{rentalGroup.name}</b> y los datos relacionados se eliminarán permanentemente
          </p>
          <p className='mt-2'>¿ Estás seguro de que quieres eliminar el medidor ?</p>
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
