'use client'

import { IconOptions } from '@/icons'
import { DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { useCalculateContext } from '../../../context/CalculateContext'

export function BillOptions() {
  const {
    useFormHook: { reset },
  } = useCalculateContext()

  function handleAddTestData() {
    reset(
      {
        billData: {
          consumption_kwh: 257,
          kwh_price: 0.6624,
          current_month_total: 218.49,
          total: 221,
        },
        consumptions: [
          {
            alias: 'Consumo 1',
            consumption: 30.43,
          },
        ],
      },
      {
        keepDefaultValues: true,
      },
    )
  }

  function handleResetForm() {
    reset()
  }

  return (
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
        <DropdownItem key='add' onPress={handleAddTestData}>
          Agregar datos de prueba
        </DropdownItem>
        <DropdownItem key='reset' onPress={handleResetForm}>
          Vaciar formulario
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
