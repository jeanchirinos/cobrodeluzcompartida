'use client'

import { IconOptions } from '@/icons'
import { DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { useFormContext } from 'react-hook-form'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'

export function BillOptions() {
  const { reset } = useFormContext<CalculateResults>()

  function handleAddTestData() {
    const newData: CalculateResults = {
      billData: {
        consumption_kwh: 257,
        kwh_price: 0.6624,
        current_month_total: 218.49,
        total: 221,
      },
      consumptions: [
        {
          consumption_kwh: 30.43,
        },
      ],
    }

    reset(newData, {
      keepDefaultValues: true,
    })
  }

  function handleResetForm() {
    reset(
      {
        consumptions: [{ consumption_kwh: 0 }],
      },
      { keepDefaultValues: true },
    )
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
