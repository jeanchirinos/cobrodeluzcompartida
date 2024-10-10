'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants/getParticipants'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { SetState } from '@/types'
import { Input, Spinner } from '@nextui-org/react'
import { useEffect, useMemo } from 'react'
import { Controller, FieldArrayWithId, useFieldArray, useFormContext } from 'react-hook-form'

export type FieldWithData = Omit<FieldArrayWithId<SchemaCalculateResultsAdd, 'consumptions'>, 'id'> &
  ResponseGetParticipants[0]

type Props = {
  setFieldsWithData: SetState<FieldWithData[]>
}

export function ParticipantsInfo(props: Props) {
  const { setFieldsWithData } = props
  const { control, watch } = useFormContext<SchemaCalculateResultsAdd>()

  const { data, isError, isPending } = useGetParticipants()

  const { participants } = data ?? {}

  const { fields } = useFieldArray({
    name: 'consumptions',
    control,
  })

  const watchFieldArray = watch('consumptions')

  const controlledFields: FieldWithData[] = useMemo(() => {
    if (!participants) return []

    const availableParticipants = participants.filter(participant => participant.active && !participant.is_main)

    return fields.map((field, index) => ({
      ...field,
      ...watchFieldArray[index],
      ...availableParticipants[index],
      id: availableParticipants[index]?.id ?? Number(field.id),
    }))
  }, [fields, watchFieldArray, participants])

  useEffect(() => {
    setFieldsWithData(controlledFields)
  }, [controlledFields, setFieldsWithData])

  if (isError) return <ErrorUi />

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {isPending ? (
            <Spinner />
          ) : (
            controlledFields.map((item, i) => (
              <Controller
                key={item.id}
                name={`consumptions.${i}.consumption_kwh`}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type='number'
                      label={<Label field={item} />}
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
            ))
          )}
        </div>
      </div>
    </section>
  )
}

type LabelProps = {
  field: FieldWithData
}

function Label(props: LabelProps) {
  const { field } = props

  return (
    <div className='flex h-8 items-center gap-x-3'>
      <span>{field.tenant.alias}</span>
      <span className='text-tiny text-foreground-500'>( {field.alias} )</span>
    </div>
  )
}
