'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants/getParticipants'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { Result } from '@/models/Result'
import { SetState } from '@/types'
import { Input, Spinner } from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  Controller,
  ControllerRenderProps,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useFormIsValidStore } from '../../../stores/formIsValid-store'
import { ParticipantOptions } from './ParticipantOptions'

export type FieldWithData = Omit<FieldArrayWithId<SchemaCalculateResultsAdd, 'consumptions'>, 'id'> &
  ResponseGetParticipants[0] &
  Pick<Result, 'meter_reading'>

type Props = {
  fieldsWithData: FieldWithData[]
  setFieldsWithData: SetState<FieldWithData[]>
}

export function ParticipantsInfo(props: Props) {
  const { fieldsWithData, setFieldsWithData } = props
  const { control } = useFormContext<SchemaCalculateResultsAdd>()

  const { data, isError, isPending } = useGetParticipants()
  const { data: rentalGroupRegisterData, isPending: isPendingRentalGroupRegistarData } = useGetRentalGroupRegister({
    lastMonth: true,
  })

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

      const controlledFields: FieldWithData[] = fields.map((field, index) => {
        return {
          ...field,
          ...consumptions[index],
          ...availableParticipants[index],
        }
      })

      return controlledFields
    }

    setFieldsWithData(controlledFields)
  }, [fields, consumptions, participants, rentalGroupRegisterData?.rentalGroupRegister.results, setFieldsWithData])

  if (isError) return <ErrorUi />

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {isPending && isPendingRentalGroupRegistarData ? (
            <Spinner />
          ) : (
            fieldsWithData.map((item, i) => <FieldWithData key={item.id} field={item} index={i} />)
          )}
        </div>
      </div>
    </section>
  )
}

type LabelProps = {
  field: FieldWithData
  setCurrentMode: SetState<'meter_reading' | 'consumption_kwh' | undefined>
  isFirstRegister: boolean
  index: number
}

function Label(props: LabelProps) {
  const { field, isFirstRegister, setCurrentMode, index } = props

  return (
    <div className='flex w-full justify-between'>
      <div className='flex h-8 items-center gap-x-3'>
        <span>{field.tenant.alias}</span>
        <span className='text-tiny text-foreground-500'>( {field.alias} )</span>
      </div>

      <ParticipantOptions isFirstRegister={isFirstRegister} setCurrentMode={setCurrentMode} index={index} />
    </div>
  )
}

function FieldWithData(props: { field: FieldWithData; index: number }) {
  const { field: item, index } = props

  const { customErrors, setIsValid, setCustomErrors } = useFormIsValidStore()
  const { control, setValue } = useFormContext<SchemaCalculateResultsAdd>()
  const { consumptions } = useWatch({ control })

  const { data: rentalGroupRegisterData } = useGetRentalGroupRegister({
    lastMonth: true,
  })

  const isFirstRegister =
    rentalGroupRegisterData === null || !rentalGroupRegisterData?.rentalGroupRegister.results[index + 1]

  const availableResults = rentalGroupRegisterData?.rentalGroupRegister.results.filter(
    result => !result.participant.is_main,
  )
  const lastMeterReading = availableResults?.[index]?.meter_reading ?? 0

  const [currentMode, setCurrentMode] = useState<'meter_reading' | 'consumption_kwh' | undefined>(undefined)

  useEffect(() => {
    if (currentMode !== undefined) return

    if (isFirstRegister) {
      setCurrentMode('consumption_kwh')
    } else {
      setCurrentMode('meter_reading')
    }
  }, [rentalGroupRegisterData, currentMode, isFirstRegister])

  function handleMeterReadingChange(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<SchemaCalculateResultsAdd, `consumptions.${number}.meter_reading`>,
  ) {
    const currentMeterReading = e.target.value === '' ? 0 : Number(e.target.value)
    const consumption_kwh = currentMeterReading - lastMeterReading

    setValue(`consumptions.${index}.consumption_kwh`, consumption_kwh)

    //

    const customConsumptionsErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>> = []

    if (currentMeterReading < lastMeterReading) {
      customConsumptionsErrors[index] = {
        meter_reading: {
          type: 'min',
          message: 'La medición actual no puede ser menor a la anterior',
        },
      }
    }

    const newIsValid = customConsumptionsErrors.length === 0

    setCustomErrors(customConsumptionsErrors)
    setIsValid({ custom: newIsValid })

    //

    return field.onChange(currentMeterReading)
  }

  useEffect(() => {
    if (currentMode === 'meter_reading') {
      const customConsumptionsErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>> = []

      const currentMeterReading = consumptions?.[index].meter_reading ?? 0

      if (currentMeterReading < lastMeterReading) {
        customConsumptionsErrors[index] = {
          meter_reading: {
            type: 'min',
            message: 'La medición actual no puede ser menor a la anterior',
          },
        }
      }

      const newIsValid = customConsumptionsErrors.length === 0

      setCustomErrors(customConsumptionsErrors)
      setIsValid({ custom: newIsValid })
    } else {
      setIsValid({ custom: true })
    }
  }, [currentMode, consumptions, index, lastMeterReading, setIsValid, setCustomErrors])

  return (
    <>
      {currentMode === 'meter_reading' && (
        <Controller
          name={`consumptions.${index}.meter_reading`}
          control={control}
          render={({ field, fieldState }) => {
            const error = fieldState.isTouched ? customErrors[index] : undefined

            return (
              <Input
                type='number'
                label={
                  <Label field={item} isFirstRegister={isFirstRegister} setCurrentMode={setCurrentMode} index={index} />
                }
                endContent='kWh'
                placeholder='0.00'
                step={0.01}
                {...field}
                value={field.value?.toString() ?? ''}
                onChange={e => handleMeterReadingChange(e, field)}
                errorMessage={fieldState.error?.message ?? error?.meter_reading?.message}
                isInvalid={fieldState.invalid || Boolean(error)}
                labelPlacement='outside'
                description={`Medición anterior: ${lastMeterReading} kWh`}
                min={lastMeterReading}
                classNames={{
                  label: '!w-full',
                }}
              />
            )
          }}
        />
      )}

      {(currentMode === 'consumption_kwh' || isFirstRegister) && (
        <div className='flex flex-col gap-y-2'>
          <Label field={item} isFirstRegister={isFirstRegister} setCurrentMode={setCurrentMode} index={index} />
          <Controller
            name={`consumptions.${index}.meter_reading`}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type='number'
                label='Medidor'
                endContent='kWh'
                placeholder='0.00'
                step={0.01}
                {...field}
                value={field.value?.toString() ?? ''}
                onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                labelPlacement='outside'
                min={0}
              />
            )}
          />
          <Controller
            name={`consumptions.${index}.consumption_kwh`}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  type='number'
                  label='Consumo'
                  endContent='kWh'
                  placeholder='0.00'
                  step={0.01}
                  {...field}
                  value={field.value?.toString() ?? ''}
                  onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  labelPlacement='outside'
                  min={0}
                />
              )
            }}
          />
        </div>
      )}
    </>
  )
}
