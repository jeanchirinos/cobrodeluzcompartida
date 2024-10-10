'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { ROUTE } from '@/constants/routes'
import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useCreateRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/useCreateRentalGroupRegister'
import { SetState } from '@/types'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { BillInfo } from './BillInfo'
import { FieldWithData, ParticipantsInfo } from './ParticipantsInfo'
import { Button } from '@nextui-org/react'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { ErrorUi } from '@/components/other/ComponentError'
import { toast } from 'sonner'

type Props = {
  results: ResultRow[]
  setFieldsWithData: SetState<FieldWithData[]>
}

export function AddRegisterForm(props: Props) {
  const { results, setFieldsWithData } = props

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext<SchemaCalculateResultsAdd>()
  const { push } = useRouter()
  const { rentalGroupId } = useParams()
  const { mutate, isPending: isMutating } = useCreateRentalGroupRegister()
  const { isPending, isError } = useGetParticipants()

  if (isError) return <ErrorUi />

  const onSubmit: SubmitHandler<SchemaCalculateResultsAdd> = data => {
    mutate(
      {
        billData: { ...data.billData, rental_group_id: Number(rentalGroupId) },
        results: results.map(result => ({
          ...result.result,
          tenant_id: result.tenant.id!,
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
          // @ts-expect-error
          toast.error(error.response?.data.msg)
        },
      },
    )
  }

  return (
    <form className='flex flex-col gap-y-12' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-12 max-lg:flex-col'>
        <BillInfo />
        <ParticipantsInfo setFieldsWithData={setFieldsWithData} />
      </div>
      <Button
        type='submit'
        color='primary'
        className='w-fit'
        isLoading={isMutating}
        isDisabled={isPending || !isDirty || !isValid}
      >
        Guardar registro
      </Button>
    </form>
  )
}
