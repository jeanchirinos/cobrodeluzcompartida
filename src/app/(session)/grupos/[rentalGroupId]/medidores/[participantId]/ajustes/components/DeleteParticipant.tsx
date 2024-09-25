'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { ROUTE } from '@/constants/routes'
import { useDeleteParticipant } from '@/controllers/ParticipantController/deleteParticipant/useDeleteParticipant'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import { handleToast } from '@/utilities/handleToast'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function DeleteParticipant() {
  const { push } = useRouter()

  const {
    data: { participant },
    isLoading,
  } = useGetParticipantById()

  const { trigger } = useDeleteParticipant()

  async function customHandleClick() {
    const res = await trigger(
      { id: participant.id },
      {
        onSuccess() {
          push(ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId: participant.rental_group_id }))
        },
      },
    )

    handleToast({ res })
  }

  const deleteParticipantDialog = useDialog()

  // RENDER
  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar medidor</h3>
        <p>El medidor se eliminará permanentemente, incluyendo sus usuarios y registros en los cuales participó.</p>
      </div>
      <Button
        onClick={deleteParticipantDialog.open}
        className='w-fit'
        color='danger'
        variant='flat'
        isDisabled={isLoading}
      >
        Eliminar
      </Button>
      <Dialog dialog={deleteParticipantDialog} dialogTitle='Eliminar medidor'>
        <DialogBody>
          <p>
            El medidor <b>{participant.alias}</b> y los datos relacionados se eliminarán permanentemente
          </p>
          <p className='mt-2'>¿ Estás seguro de que quieres eliminar el medidor ?</p>
        </DialogBody>
        <DialogFooter
          dialog={deleteParticipantDialog}
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
