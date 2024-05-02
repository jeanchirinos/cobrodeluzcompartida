'use client'

import { IconAdd, IconDelete } from '@/icons'
import { Input } from '@/components/Input'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

export function LightMetersInfo() {
  const [consumptions, setConsumptions] = useState([1])

  function addConsumption() {
    const newConsumptions = [...consumptions]

    newConsumptions.push(newConsumptions.at(-1)! + 1)

    setConsumptions(newConsumptions)
  }

  function handleRemoveConsumption(id: number) {
    const newConsumptions = consumptions.filter(item => item !== id)

    setConsumptions(newConsumptions)
  }

  return (
    <section className='space-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='space-y-6'>
        <div className='flex flex-col gap-y-6'>
          {consumptions.map(item => (
            <Input
              key={item}
              name={`participant_consumption_${item}`}
              type='number'
              endContent='kWh'
              label={
                <div className='flex space-x-3 items-center h-8'>
                  <span>Consumo {item}</span>
                  {consumptions.length > 1 && (
                    <Button
                      onClick={() => handleRemoveConsumption(item)}
                      isIconOnly
                      size='sm'
                      aria-label='Remover consumo'
                      title='Remover consumo'
                      variant='light'
                      color='danger'
                    >
                      <IconDelete />
                    </Button>
                  )}
                </div>
              }
              placeholder='0.00'
              step={0.01}
            />
          ))}
        </div>
        <Button
          color='primary'
          variant='flat'
          fullWidth
          startContent={<IconAdd />}
          onClick={addConsumption}
        >
          Agregar consumo
        </Button>
      </div>
    </section>
  )
}
