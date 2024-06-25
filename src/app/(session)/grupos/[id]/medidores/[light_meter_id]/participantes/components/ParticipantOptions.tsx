'use client'

import { IconOptions } from '@/icons'
import { DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { useDialog } from '@/components/Dialog/useDialog'
import { Dialog } from '@/components/Dialog/Dialog'
import { UpdateParticipantDialog } from './UpdateParticipant'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants'
import { ShareParticipantDialog } from './ShareParticipant'

type ParticipantOptionsProps = { participant: ResponseGetParticipants[0] }

export function ParticipantOptions(props: ParticipantOptionsProps) {
  const editDialog = useDialog()
  const shareParticipantDialog = useDialog()
  const deleteDialog = useDialog()

  return (
    <>
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content: 'min-w-fit',
        }}
      >
        <DropdownTrigger>
          <Button size='sm' variant='light' isIconOnly aria-label='Opciones'>
            <IconOptions />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Opciones'
          classNames={{
            list: '*:pr-8',
          }}
        >
          <DropdownItem key='edit' onPress={editDialog.open}>
            Editar
          </DropdownItem>
          <DropdownItem key='share' onPress={shareParticipantDialog.open}>
            Compartir registros
          </DropdownItem>
          <DropdownItem
            key='delete'
            onPress={deleteDialog.open}
            variant='flat'
            color='danger'
            className='text-danger-500'
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dialog dialog={editDialog} dialogTitle='Editar participante'>
        <UpdateParticipantDialog participant={props.participant} updateParticipantDialog={editDialog} />
      </Dialog>

      <Dialog dialog={shareParticipantDialog} dialogTitle='Compartir registros a participante'>
        <ShareParticipantDialog participant={props.participant} dialog={shareParticipantDialog} />
      </Dialog>

      <Dialog dialog={deleteDialog} dialogTitle='Eliminar participante'>
        {/* <ShareParticipantDialog participant={props.participant} dialog={deleteDialog} /> */}
      </Dialog>
    </>
  )
}
