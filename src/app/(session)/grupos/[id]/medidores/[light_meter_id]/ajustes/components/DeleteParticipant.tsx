'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { deleteParticipant } from '@/controllers/ParticipantController/deleteParticipant'
import { Button } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { handleResponse } from '@/utilities/handleResponse'
import { ROUTE } from '@/constants/routes'

import { useParticipantContext } from '../../context/ParticipantContext'

export function DeleteParticipant() {
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()

  const { participant } = useParticipantContext()
  const deleteParticipantDialog = useDialog()

  async function customHandleClick() {
    const res = await deleteParticipant({ id: participant.id, rentalGroupId: Number(id) })

    await handleResponse({
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
      <Button onClick={deleteParticipantDialog.open} className='w-fit' color='danger' variant='flat'>
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
