'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { CustomInput } from '@/components/ReactForm/withHookForm'

type UpdateParticipantProps = { participant: ResponseGetParticipants[0] }

export function UpdateParticipant(props: UpdateParticipantProps) {
  const { participant } = props
  const { id } = useParams<{ id: string }>()

  const updateParticipantDialog = useDialog()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: participant,
    action: data => updateParticipant({ rentalGroupId: Number(id), id: participant.id, ...data }),
    actionProps: {
      onSuccess: () => {
        updateParticipantDialog.close()
      },
    },
  })

  // RENDER
  return (
    <section>
      <Button onClick={updateParticipantDialog.open} variant='flat'>
        Actualizar
      </Button>
      <Dialog dialog={updateParticipantDialog} dialogTitle='Actualizar participante'>
        <DialogBody>
          <form onSubmit={useFormHook.onSubmit}>
            <CustomInput useFormHook={useFormHook} name='alias' label='Alias' />
          </form>
        </DialogBody>
        <DialogFooter
          useFormHook={useFormHook}
          dialog={updateParticipantDialog}
          variant='3'
          mainButtonProps={{
            children: 'Actualizar',
          }}
        />
      </Dialog>
    </section>
  )
}
