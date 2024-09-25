'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { ROUTE } from '@/constants/routes'
import { useDeleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup/useDeleteRentalGroup'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import { handleToast } from '@/utilities/handleToast'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function DeleteGroup() {
  const { push } = useRouter()
  const deleteRentalGroupDialog = useDialog()

  const { data: rentalGroup, isLoading } = useGetRentalGroupById()

  const { trigger } = useDeleteRentalGroup()

  async function customHandleClick() {
    const res = await trigger(
      { id: rentalGroup.id },
      {
        onSuccess() {
          push(ROUTE.GROUPS.INDEX)
        },
      },
    )

    handleToast({ res })
  }

  // RENDER
  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar grupo</h3>
        <p>El proyecto se eliminará permanentemente, incluyendo sus registros.</p>
      </div>
      <Button
        isDisabled={isLoading}
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
