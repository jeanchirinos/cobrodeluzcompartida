'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { ErrorUi } from '@/components/other/ComponentError'
import { ROUTE } from '@/constants/routes'
import { useDeleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup/useDeleteRentalGroup'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'

export function DeleteGroup() {
  const { push } = useRouter()
  const deleteRentalGroupDialog = useDialog()

  const { data: rentalGroup, isPending, isError, isSuccess } = useGetRentalGroupById()

  const { mutate, isPending: deleteRentalGroupIsPending } = useDeleteRentalGroup()

  if (isError) return <ErrorUi />

  function handleDelete() {
    if (!rentalGroup) return

    mutate(
      { id: rentalGroup.id },
      {
        onSuccess() {
          deleteRentalGroupDialog.close()
          push(ROUTE.GROUPS.INDEX)
        },
      },
    )
  }

  // RENDER
  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar grupo</h3>
        <p>El grupo se eliminará permanentemente, incluyendo sus registros.</p>
      </div>
      <Button
        isDisabled={isPending}
        onClick={deleteRentalGroupDialog.open}
        className='w-fit'
        color='danger'
        variant='flat'
      >
        Eliminar
      </Button>
      {isSuccess && (
        <Dialog dialog={deleteRentalGroupDialog} dialogTitle='Eliminar grupo'>
          <DialogBody>
            <p>
              El grupo <b>{rentalGroup.name}</b> y sus registros se eliminarán permanentemente
            </p>
            <p className='mt-2'>¿ Estás seguro de que quieres eliminar el grupo ?</p>
          </DialogBody>

          <DialogFooter>
            <Button onPress={deleteRentalGroupDialog.close} variant='flat'>
              Cancelar
            </Button>
            <Button color='danger' isLoading={deleteRentalGroupIsPending} onPress={handleDelete}>
              Sí, Eliminar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </section>
  )
}
