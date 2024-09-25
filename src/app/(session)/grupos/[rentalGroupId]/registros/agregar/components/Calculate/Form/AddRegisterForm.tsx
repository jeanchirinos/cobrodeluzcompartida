'use client'

import { ROUTE } from '@/constants/routes'
import { CalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useCreateRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/useCreateRentalGroupRegister'
import { handleToast } from '@/utilities/handleToast'
import { useParams, useRouter } from 'next/navigation'
import { useCalculateContext } from '../../../context/CalculateContext'
import { SaveButton } from '../../SaveButton'
import { BillInfo } from './BillInfo'
import { ParticipantsInfo } from './ParticipantsInfo'

export function AddRegisterForm() {
  const { results, useFormHook } = useCalculateContext()
  const { handleSubmit } = useFormHook

  const { push } = useRouter()
  const params = useParams()
  const { rentalGroupId } = params as { rentalGroupId: string }

  const { trigger } = useCreateRentalGroupRegister()

  async function handleSave(data: CalculateResultsAdd) {
    const res = await trigger(
      {
        billData: { ...data.billData, rental_group_id: Number(rentalGroupId) },
        results: results.map(result => ({
          ...result.result,
          tenant_id: result.tenant.id!,
          // TODO
        })),
      },
      {
        onSuccess() {
          push(ROUTE.GROUPS.REGISTERS.INDEX({ id: rentalGroupId }))
        },
      },
    )

    handleToast({ res })
  }

  return (
    <form className='flex flex-col gap-y-12' onSubmit={handleSubmit(handleSave)}>
      <div className='flex gap-12 max-lg:flex-col'>
        <BillInfo />
        <ParticipantsInfo />
      </div>
      <SaveButton />
    </form>
  )
}
