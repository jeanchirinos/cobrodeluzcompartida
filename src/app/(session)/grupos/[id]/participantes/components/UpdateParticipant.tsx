'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog, useDialog } from '@/components/Dialog/useDialog'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'

type UpdateParticipantProps = { participant: ResponseGetParticipants[0] }

export function UpdateParticipant(props: UpdateParticipantProps) {
  const updateParticipantDialog = useDialog()

  // RENDER
  return (
    <>
      <Button onClick={updateParticipantDialog.open} variant='flat'>
        Actualizar
      </Button>
      <Dialog dialog={updateParticipantDialog} dialogTitle='Actualizar participante'>
        <UpdateParticipantDialog
          participant={props.participant}
          updateParticipantDialog={updateParticipantDialog}
        />
      </Dialog>
    </>
  )
}

function UpdateParticipantDialog(props: {
  participant: ResponseGetParticipants[0]
  updateParticipantDialog: UseDialog
}) {
  const { participant, updateParticipantDialog } = props

  const { id: rentalGroupId } = useParams<{ id: string }>()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: participant,
    action: data =>
      updateParticipant({ ...data, rentalGroupId: Number(rentalGroupId), id: participant.id }),
  })

  return (
    <>
      <DialogBody>
        <form onSubmit={useFormHook.onSubmit} className='flex flex-col gap-y-5'>
          <CustomInput useFormHook={useFormHook} name='alias' label='Alias' />
          <CustomInput useFormHook={useFormHook} name='key' label='Clave' isDisabled />
          <HookFormButton useFormHook={useFormHook} className='hidden' />
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
    </>
  )
}
