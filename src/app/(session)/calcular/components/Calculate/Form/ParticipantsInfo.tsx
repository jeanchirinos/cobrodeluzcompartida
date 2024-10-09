'use client'

import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { IconAdd, IconDelete } from '@/icons'
import { SetState } from '@/types'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'
import { useEffect, useMemo } from 'react'
import { Controller, FieldArrayWithId, useFieldArray, useFormContext } from 'react-hook-form'

type Props = {
  setFieldsWithData: SetState<FieldWithData[]>
}

export type FieldWithData = FieldArrayWithId<CalculateResults, 'consumptions'> & { alias: string }

export function ParticipantsInfo(props: Props) {
  const { setFieldsWithData } = props

  const { control, watch } = useFormContext<CalculateResults>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'consumptions',
  })

  const watchFieldArray = watch('consumptions')

  const controlledFields = useMemo(
    () =>
      fields.map((field, index) => {
        return {
          ...field,
          ...watchFieldArray[index],
          alias: `Consumo ${index + 1}`,
        }
      }),
    [fields, watchFieldArray],
  )

  useEffect(() => {
    setFieldsWithData(controlledFields)
  }, [controlledFields, setFieldsWithData])

  function handleAddConsumption() {
    const newConsumption = { consumption_kwh: 0 }

    append(newConsumption)
  }

  function handleRemoveConsumption(index: number) {
    remove(index)
  }

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {controlledFields.map((item, i) => (
            <Controller
              key={item.id}
              name={`consumptions.${i}.consumption_kwh`}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    type='number'
                    label={
                      <Label
                        fieldsLength={fields.length}
                        handleRemoveConsumption={() => handleRemoveConsumption(i)}
                        field={item}
                      />
                    }
                    endContent='kWh'
                    placeholder='0.00'
                    step={0.01}
                    {...field}
                    value={field.value?.toString() ?? ''}
                    onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    labelPlacement='outside'
                  />
                )
              }}
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
  fieldsLength: number
  handleRemoveConsumption: (index: number) => void
  field: FieldWithData
}

function Label(props: LabelProps) {
  const { field, fieldsLength, handleRemoveConsumption } = props

  return (
    <div className='flex h-8 items-center space-x-3'>
      <span>{field.alias}</span>
      {fieldsLength > 1 && (
        <Button
          onPress={handleRemoveConsumption as () => void}
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
