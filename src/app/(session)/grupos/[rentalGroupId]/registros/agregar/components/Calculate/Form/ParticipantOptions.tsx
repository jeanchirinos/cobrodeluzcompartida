'use client'

import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
// import { Dialog } from '@/components/Dialog/Dialog'
// import { useDialog } from '@/components/Dialog/useDialog'
import { IconOptions } from '@/icons'
import { SetState } from '@/types'
import { Button } from '@heroui/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { useFormContext } from 'react-hook-form'

type ParticipantOptionsProps = {
  setCurrentMode: SetState<'meter_reading' | 'consumption_kwh' | undefined>
  isFirstRegister: boolean
  index: number
}

export function ParticipantOptions(props: ParticipantOptionsProps) {
  const { isFirstRegister, setCurrentMode, index } = props

  const disabledKeys = isFirstRegister ? ['changeMode'] : []

  const { resetField } = useFormContext<SchemaCalculateResultsAdd>()

  function handleChangeMode() {
    resetField(`consumptions.${index}`)

    setCurrentMode(prev => (prev === 'meter_reading' ? 'consumption_kwh' : 'meter_reading'))
  }

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
          disabledKeys={disabledKeys}
        >
          <DropdownItem key='changeMode' onPress={handleChangeMode}>
            Cambiar modo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
