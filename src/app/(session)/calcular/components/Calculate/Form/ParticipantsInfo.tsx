'use client'

import { IconAdd, IconDelete } from '@/icons'
import { Button } from '@nextui-org/button'
import { useCalculateContext } from '../../../context/CalculateContext'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { FieldArrayWithId, useFieldArray, UseFieldArrayReturn } from 'react-hook-form'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'

export function ParticipantsInfo() {
  const { useFormHook } = useCalculateContext()
  const { control } = useFormHook

  const { fields, append, remove } = useFieldArray({
    name: 'consumptions',
    control,
  })

  function handleAddConsumption() {
    const newConsumption = { consumption_kwh: undefined as unknown as number, alias: `Consumo ${fields.length + 1}` }

    append(newConsumption)
  }

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {fields.map((field, i) => (
            <CustomInput
              useFormHook={useFormHook}
              key={field.id}
              name={`consumptions.${i}.consumption_kwh`}
              registerOptions={{ valueAsNumber: true }}
              type='number'
              endContent='kWh'
              label={<Label fields={fields} index={i} remove={remove} />}
              placeholder='0.00'
              step={0.01}
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

  const { useFormHook } = useCalculateContext()
  const { trigger } = useFormHook

  async function handleRemoveConsumption() {
    remove(index)
    await trigger(`consumptions.${index}.consumption_kwh`)
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
