'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { ROUTE } from '@/constants/routes'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useCreateRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/useCreateRentalGroupRegister'
import { SetState } from '@/types'
import { Button } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { BillInfo } from './BillInfo'
import { FieldWithData, ParticipantsInfo } from './ParticipantsInfo'
import { useFormIsValidStore } from '../../../stores/formIsValid-store'

type Props = {
  results: ResultRow[]
  fieldsWithData: FieldWithData[]
  setFieldsWithData: SetState<FieldWithData[]>
}

export function AddRegisterForm(props: Props) {
  const { results, fieldsWithData, setFieldsWithData } = props

  const {
    handleSubmit,
    formState: { isDirty },
  } = useFormContext<SchemaCalculateResultsAdd>()

  const { isValid } = useFormIsValidStore()

  const { push } = useRouter()
  const { rentalGroupId } = useParams()
  const { mutate, isPending: isMutating } = useCreateRentalGroupRegister()
  const { isPending, isError } = useGetParticipants()

  if (isError) return <ErrorUi />

  const onSubmit: SubmitHandler<SchemaCalculateResultsAdd> = data => {
    mutate(
      {
        billData: { ...data.billData, rental_group_id: Number(rentalGroupId) },
        results: results.map((result, i) => ({
          ...result.result,
          tenant_id: result.tenant.id!,
          meter_reading: data.consumptions[i - 1]?.meter_reading,
        })),
      },
      {
        onSuccess(data) {
          toast.success(data.msg)

          const url =
            ROUTE.GROUPS.REGISTERS.INDEX({ rentalGroupId: Number(rentalGroupId) }) +
            `?year=${data.data.year}&month=${data.data.month}`

          push(url)
        },
        onError(error) {
          // @ts-expect-error: error.response might be undefined
          toast.error(error.response?.data.msg)
        },
      },
    )
  }

  return (
    <form className='flex flex-col gap-y-12' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-12 max-lg:flex-col'>
        <BillInfo />
        <ParticipantsInfo fieldsWithData={fieldsWithData} setFieldsWithData={setFieldsWithData} />
      </div>
      <Button
        type='submit'
        color='primary'
        className='w-fit'
        isLoading={isMutating}
        isDisabled={isPending || !isDirty || !isValid.all}
      >
        Guardar registro
      </Button>
    </form>
  )
}
