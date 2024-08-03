'use client'

import { useCalculateContext } from '../../../context/CalculateContext'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { FieldArrayWithId, useFieldArray } from 'react-hook-form'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useEffect } from 'react'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'

export function ParticipantsInfo() {
  const { useFormHook } = useCalculateContext()
  const { control } = useFormHook

  const { fields, append } = useFieldArray({
    name: 'consumptions',
    control,
  })

  const { data } = useGetParticipants()

  useEffect(() => {
    data.participants.forEach(participant => {
      if (participant.is_main || !participant.active) return

      const newConsumption = {
        alias: participant.tenant.alias,
        tenant_id: participant.tenant.id,
        consumption_kwh: undefined as unknown as number,
      }

      append(newConsumption)
    })
  }, [append, data])

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
              label={<Label field={field} />}
              placeholder='0.00'
              step={0.01}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type LabelProps = {
  field: FieldArrayWithId<CalculateResults>
}

function Label(props: LabelProps) {
  const { field } = props

  return (
    <div className='flex h-8 items-center space-x-3'>
      <span>{field.alias}</span>
    </div>
  )
}
