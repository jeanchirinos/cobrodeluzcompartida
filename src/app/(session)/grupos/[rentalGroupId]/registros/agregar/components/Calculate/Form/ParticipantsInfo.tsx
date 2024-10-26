'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants/getParticipants'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { Result } from '@/models/Result'
import { SetState } from '@/types'
import { Input, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Controller, FieldArrayWithId, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useFormIsValidStore } from '../../../stores/formIsValid-store'
import { ParticipantOptions } from './ParticipantOptions'

export type FieldWithData = Omit<FieldArrayWithId<SchemaCalculateResultsAdd, 'consumptions'>, 'id'> &
  ResponseGetParticipants[0] &
  Pick<Result, 'meter_reading'> & {
    lastMeterReading: number | undefined
  }

type Props = {
  fieldsWithData: FieldWithData[]
  setFieldsWithData: SetState<FieldWithData[]>
}

export function ParticipantsInfo(props: Props) {
  const { fieldsWithData, setFieldsWithData } = props
  const { control } = useFormContext<SchemaCalculateResultsAdd>()

  const { customErrors } = useFormIsValidStore()

  const { data, isError, isPending } = useGetParticipants()
  const { data: rentalGroupRegisterData } = useGetRentalGroupRegister({ lastMonth: true })

  const { participants } = data ?? {}

  const { fields } = useFieldArray({
    name: 'consumptions',
    control,
  })

  const { consumptions } = useWatch({ control })

  useEffect(() => {
    const controlledFields: () => FieldWithData[] = () => {
      if (!participants) return []
      if (!consumptions) return []

      const availableParticipants = participants.filter(participant => participant.active && !participant.is_main)

      const availableResults = rentalGroupRegisterData?.rentalGroupRegister.results.filter(
        result => !result.participant.is_main,
      )

      const controlledFields: FieldWithData[] = fields.map((field, index) => {
        const currentMeterReading = consumptions[index]?.meter_reading ?? 0
        const lastMeterReading = availableResults?.[index].meter_reading ?? 0

        return {
          ...field,
          ...consumptions[index],
          ...availableParticipants[index],
          lastMeterReading,
          meter_reading: currentMeterReading,
          consumption_kwh: currentMeterReading - lastMeterReading,
        }
      })

      return controlledFields
    }

    setFieldsWithData(controlledFields)
  }, [fields, consumptions, participants, rentalGroupRegisterData?.rentalGroupRegister.results, setFieldsWithData])

  const [currentMode, setCurrentMode] = useState<'meter_reading' | 'consumption_kwh'>('meter_reading')

  if (isError) return <ErrorUi />

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {isPending ? (
            <Spinner />
          ) : (
            fieldsWithData.map((item, i) => {
              return (
                <div className='flex flex-col gap-y-3' key={item.id}>
                  {currentMode === 'meter_reading' && (
                    <Controller
                      name={`consumptions.${i}.meter_reading`}
                      control={control}
                      render={({ field, fieldState }) => {
                        const error = fieldState.isTouched ? customErrors[i] : undefined

                        return (
                          <Input
                            type='number'
                            label={<Label field={item} currentMode={currentMode} setCurrentMode={setCurrentMode} />}
                            endContent='kWh'
                            placeholder='0.00'
                            step={0.01}
                            {...field}
                            value={field.value?.toString() ?? ''}
                            onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                            errorMessage={fieldState.error?.message ?? error?.meter_reading?.message}
                            isInvalid={fieldState.invalid || Boolean(error)}
                            labelPlacement='outside'
                            description={`Medición anterior: ${item.lastMeterReading ?? 0} kWh`}
                            min={item.lastMeterReading ?? 0}
                          />
                        )
                      }}
                    />
                  )}

                  {currentMode === 'consumption_kwh' && (
                    <Controller
                      name={`consumptions.${i}.consumption_kwh`}
                      control={control}
                      render={({ field, fieldState }) => {
                        return (
                          <Input
                            type='number'
                            label={<Label field={item} currentMode={currentMode} setCurrentMode={setCurrentMode} />}
                            endContent='kWh'
                            placeholder='0.00'
                            step={0.01}
                            {...field}
                            value={field.value?.toString() ?? ''}
                            onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                            errorMessage={fieldState.error?.message}
                            isInvalid={fieldState.invalid}
                            labelPlacement='outside'
                            classNames={{
                              label: '!w-full',
                            }}
                          />
                        )
                      }}
                    />
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

type LabelProps = {
  field: FieldWithData
  currentMode: 'meter_reading' | 'consumption_kwh'
  setCurrentMode: SetState<'meter_reading' | 'consumption_kwh'>
}

function Label(props: LabelProps) {
  const { field, currentMode, setCurrentMode } = props

  return (
    <div className='flex w-full justify-between'>
      <div className='flex h-8 items-center gap-x-3'>
        <span>{field.tenant.alias}</span>
        <span className='text-tiny text-foreground-500'>( {field.alias} )</span>
      </div>

      <ParticipantOptions currentMode={currentMode} setCurrentMode={setCurrentMode} />
    </div>
  )
}
