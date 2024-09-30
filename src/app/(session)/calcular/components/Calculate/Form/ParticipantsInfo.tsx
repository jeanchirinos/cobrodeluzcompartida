'use client'

import { IconAdd, IconDelete } from '@/icons'
import { Button } from '@nextui-org/button'
import { Controller, FieldArrayWithId, useFieldArray, UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { Input } from '@nextui-org/react'

export function ParticipantsInfo() {
  const { control } = useFormContext<CalculateResults>()

  const { fields, append, remove } = useFieldArray({
    name: 'consumptions',
    control,
  })

  function handleAddConsumption() {
    const newConsumption = { consumption_kwh: 0, alias: `Consumo ${fields.length + 1}` }

    append(newConsumption)
  }

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {fields.map((field, i) => (
            <Controller
              key={field.id}
              name={`consumptions.${i}.consumption_kwh`}
              control={control}
              render={({ field, fieldState, formState }) => (
                <Input
                  type='number'
                  label={<Label fields={fields} index={i} remove={remove} />}
                  endContent='kWh'
                  placeholder='0.00'
                  step={0.01}
                  {...field}
                  value={field.value.toString()}
                  onChange={e => field.onChange(Number(e.target.value))}
                  errorMessage={fieldState.error?.message}
                  isInvalid={Boolean(fieldState.error)}
                  isDisabled={formState.isSubmitting}
                  labelPlacement='outside'
                />
              )}
            />
          ))}
        </div>
        <Button
          type='button'
          color='primary'
          variant='flat'
          fullWidth
          endContent={<IconAdd />}
          onPress={handleAddConsumption}
          isDisabled={fields.length >= 5}
        >
          Agregar consumo
        </Button>
      </div>
    </section>
  )
}

type LabelProps = {
  fields: Array<FieldArrayWithId<CalculateResults>>
  index: number
} & Pick<UseFieldArrayReturn<CalculateResults>, 'remove'>

function Label(props: LabelProps) {
  const { fields, remove, index } = props

  async function handleRemoveConsumption() {
    remove(index)
  }

  return (
    <div className='flex h-8 items-center space-x-3'>
      <span>Consumo {index + 1}</span>
      {fields.length > 1 && (
        <Button
          onPress={handleRemoveConsumption}
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
  )
}
