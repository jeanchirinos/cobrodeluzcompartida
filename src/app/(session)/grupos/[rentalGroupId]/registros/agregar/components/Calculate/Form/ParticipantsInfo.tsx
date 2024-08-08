'use client'

import { useCalculateContext } from '../../../context/CalculateContext'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { ResponseGetParticipants } from '@/controllers/ParticipantController/getParticipants/getParticipants'

export function ParticipantsInfo() {
  const { useFormHook } = useCalculateContext()
  const { control } = useFormHook

  const { append } = useFieldArray({
    name: 'consumptions',
    control,
  })

  const [myFields, setMyFields] = useState<ResponseGetParticipants>([])

  const {
    data: { participants },
  } = useGetParticipants()

  useEffect(() => {
    participants.forEach(participant => {
      if (participant.is_main || !participant.active) return

      const newConsumption = {
        consumption_kwh: undefined as unknown as number,
      }

      append(newConsumption, { shouldFocus: false })
    })

    setMyFields(participants.filter(participant => !participant.is_main && participant.active))
  }, [append, participants])

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          {myFields.map((field, i) => (
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
  field: ResponseGetParticipants[0]
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
