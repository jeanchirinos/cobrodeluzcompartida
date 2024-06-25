'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { Snippet } from '@nextui-org/react'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants'

type ShareParticipantDialogProps = { participant: ResponseGetParticipants[0]; dialog: UseDialog }

export function ShareParticipantDialog(props: ShareParticipantDialogProps) {
  const { participant, dialog } = props

  return (
    <>
      <DialogBody className='flex flex-col gap-y-4'>
        <p>Comparte este enlace con el participante para que pueda ver sus registros de este medidor.</p>
        <Snippet
          hideSymbol
          tooltipProps={{ content: 'Copiar enlace' }}
          codeString={`https://cobrodeluzcompartida.vercel.app/compartir/${participant.key}`}
        >
          {`@/compartir/${participant.key}`}
        </Snippet>
      </DialogBody>
      <DialogFooter variant='1' dialog={dialog} />
    </>
  )
}
