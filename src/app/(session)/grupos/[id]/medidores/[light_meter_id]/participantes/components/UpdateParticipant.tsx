'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { Switch } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'

type UpdateParticipantDialogProps = { participant: ResponseGetParticipants[0]; updateParticipantDialog: UseDialog }

export function UpdateParticipantDialog(props: UpdateParticipantDialogProps) {
  const { participant, updateParticipantDialog } = props

  const { id: rentalGroupId } = useParams<{ id: string }>()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: participant,
    submitActionFn: data => updateParticipant({ ...data, rentalGroupId: Number(rentalGroupId), id: participant.id }),
  })

  return (
    <>
      <DialogBody>
        <form onSubmit={useFormHook.onSubmit} className='flex flex-col gap-y-5'>
          <CustomInput useFormHook={useFormHook} name='alias' label='Alias' />
          <CustomInput useFormHook={useFormHook} name='key' label='Clave' isDisabled />
          <Switch
            classNames={{
              base: 'flex-row-reverse gap-x-2',
            }}
            size='sm'
          >
            <div className='flex flex-col gap-1'>
              <p className='text-medium'>Activo</p>
              <p className='text-small text-default-400'>
                Solo un participante puede ser activo. Si se activa este participante, el anterior se desactivará
              </p>
            </div>
          </Switch>
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
