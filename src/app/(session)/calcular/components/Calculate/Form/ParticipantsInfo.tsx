'use client'

import { IconAdd, IconDelete } from '@/icons'
import { Button } from '@nextui-org/button'
import { useCalculateContext } from '../../../context/CalculateContext'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { FieldArrayWithId, useFieldArray, UseFieldArrayReturn } from 'react-hook-form'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'

export function ParticipantsInfo() {
  const { useFormHook } = useCalculateContext()
  const { control, watch } = useFormHook

  const { fields, append, replace } = useFieldArray({
    name: 'consumptions',
    control,
  })

  const watchFieldArray = watch('consumptions')

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
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
          {controlledFields.map((field, i) => (
            <CustomInput
              useFormHook={useFormHook}
              key={field.id}
              name={`consumptions.${i}.consumption_kwh`}
              registerOptions={{ valueAsNumber: true }}
              type='number'
              endContent='kWh'
              label={<Label controlledFields={controlledFields} field={field} index={i} replace={replace} />}
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
          isDisabled={controlledFields.length >= 5}
        >
          Agregar consumo
        </Button>
      </div>
    </section>
  )
}

type LabelProps = {
  controlledFields: Array<FieldArrayWithId<CalculateResults>>
  field: FieldArrayWithId<CalculateResults>
  index: number
} & Pick<UseFieldArrayReturn<CalculateResults>, 'replace'>

function Label(props: LabelProps) {
  const { controlledFields, replace, index, field } = props

  const { useFormHook } = useCalculateContext()
  const { trigger } = useFormHook

  async function handleRemoveConsumption() {
    const newFields = controlledFields
      .filter(controlledField => controlledField.id !== field.id)
      .map((field, index) => ({ ...field, alias: `Consumo ${index + 1}` }))

    replace(newFields)

    await trigger(`consumptions.${index}.consumption_kwh`)
  }

  return (
    <div className='flex h-8 items-center space-x-3'>
      <span>{field.alias}</span>
      {controlledFields.length > 1 && (
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
