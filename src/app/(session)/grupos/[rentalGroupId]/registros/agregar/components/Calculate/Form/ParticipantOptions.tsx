'use client'

import { Dialog } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { IconOptions } from '@/icons'
import { SetState } from '@/types'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { ChangeModeDialog } from './ChangeModeDialog'

type ParticipantOptionsProps = {
  currentMode: 'meter_reading' | 'consumption_kwh'
  setCurrentMode: SetState<'meter_reading' | 'consumption_kwh'>
}

export function ParticipantOptions(props: ParticipantOptionsProps) {
  const editDialog = useDialog()

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
            Cambiar modo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dialog dialog={editDialog} dialogTitle='Cambiar modo'>
        <ChangeModeDialog dialog={editDialog} currentMode={props.currentMode} setCurrentMode={props.setCurrentMode} />
      </Dialog>
    </>
  )
}
