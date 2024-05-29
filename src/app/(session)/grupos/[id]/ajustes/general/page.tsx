'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { deleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<{ id: string }>()

  async function customHandleClick() {
    await deleteRentalGroup({ id: params.id })
  }

  const myDialog = useDialog()

  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar grupo</h3>
        <p>El proyecto se eliminará permanentemente, incluyendo sus registros.</p>
      </div>
      <Button onClick={myDialog.open} className='w-fit'>
        Eliminar
      </Button>
      <Dialog dialog={myDialog} dialogTitle='Eliminar grupo'>
        <DialogBody>
          <p>Esto eliminará permanentemente el grupo y sus registros</p>
          <p className='mt-2'>¿ Estás seguro de que quieres eliminar el grupo ?</p>
        </DialogBody>
        <DialogFooter
          dialog={myDialog}
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
