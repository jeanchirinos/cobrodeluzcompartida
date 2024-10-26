'use client'

import { DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { SetState } from '@/types'
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { z } from 'zod'

type ChangeModeDialogProps = {
  currentMode: 'meter_reading' | 'consumption_kwh'
  setCurrentMode: SetState<'meter_reading' | 'consumption_kwh'>
  dialog: UseDialog
}

const schema = z.object({
  meter_reading: z.number().nonnegative(),
})

export function ChangeModeDialog(props: ChangeModeDialogProps) {
  const { currentMode, setCurrentMode, dialog } = props

  const [temporalCurrentMode, setTemporalCurrentMode] = useState(currentMode)

  const {
    control,
    formState: { isValid },
    reset,
  } = useReactHookForm({
    schema: schema,
    values: {
      meter_reading: 0, // TODO: Get the last meter reading
    },
  })

  function handleClick() {
    setCurrentMode(temporalCurrentMode)
    dialog.close()
  }

  // const isDisabled = temporalCurrentMode === 'consumption_kwh' && !isValid
  const isDisabled = true

  return (
    <>
      <DialogBody className='flex flex-col gap-y-6'>
        <RadioGroup
          label='Select your favorite city'
          color='warning'
          size='sm'
          value={temporalCurrentMode}
          onValueChange={value => {
            reset()
            setTemporalCurrentMode(value as typeof temporalCurrentMode)
          }}
          classNames={{
            wrapper: 'overflow-hidden',
          }}
        >
          <Radio value='meter_reading' description='Toma en cuenta medida anterior' type='button'>
            Medida
          </Radio>
          <Radio value='consumption_kwh' description='Ingreso de consumo directo' type='button' isDisabled>
            Consumo
          </Radio>
        </RadioGroup>

        {temporalCurrentMode === 'consumption_kwh' && (
          <>
            <div>
              <h3 className='text-small font-bold'>Medida actual</h3>
              <p className='text-tiny'>Se tomará en cuenta para las siguientes mediciones.</p>
            </div>
            <form className='flex flex-col gap-y-5'>
              <Controller
                name='meter_reading'
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    type='number'
                    endContent='kWh'
                    placeholder='0.00'
                    {...field}
                    value={field.value.toString() ?? ''}
                    onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    labelPlacement='outside'
                    min={0}
                  />
                )}
              />
            </form>
          </>
        )}
      </DialogBody>

      <DialogFooter>
        <Button onPress={dialog.close} variant='flat'>
          Cancelar
        </Button>
        <Button color='primary' onClick={handleClick} isDisabled={isDisabled}>
          Cambiar
        </Button>
      </DialogFooter>
    </>
  )
}
