'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { ErrorUi } from '@/components/other/ComponentError'
import { ROUTE } from '@/constants/routes'
import { useDeleteParticipant } from '@/controllers/ParticipantController/deleteParticipant/useDeleteParticipant'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function DeleteParticipant() {
  const { push } = useRouter()
  const deleteParticipantDialog = useDialog()

  const { data: participant, isPending, isError, isSuccess } = useGetParticipantById()

  const { mutate, isPending: isMutating } = useDeleteParticipant()

  if (isError) return <ErrorUi />

  function handleDelete() {
    if (!participant) return

    mutate(
      { id: participant.id },
      {
        onSuccess() {
          deleteParticipantDialog.close()

          push(ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId: participant.rental_group_id }))
        },
      },
    )
  }

  // RENDER
  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar medidor</h3>
        <p>El medidor se eliminará permanentemente, incluyendo sus usuarios y registros en los cuales participó.</p>
      </div>
      <Button
        isDisabled={isPending}
        onClick={deleteParticipantDialog.open}
        className='w-fit'
        color='danger'
        variant='flat'
      >
        Eliminar
      </Button>

      {isSuccess && (
        <Dialog dialog={deleteParticipantDialog} dialogTitle='Eliminar medidor'>
          <DialogBody>
            <p>
              El medidor <b>{participant.alias}</b> y los datos relacionados se eliminarán permanentemente
            </p>
            <p className='mt-2'>¿ Estás seguro de que quieres eliminar el medidor ?</p>
          </DialogBody>

          <DialogFooter>
            <Button onPress={deleteParticipantDialog.close} variant='flat'>
              Cancelar
            </Button>
            <Button color='danger' isLoading={isMutating} onPress={handleDelete}>
              Sí, Eliminar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </section>
  )
}
