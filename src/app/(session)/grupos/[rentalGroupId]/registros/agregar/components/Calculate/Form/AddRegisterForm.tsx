'use client'

import { useParams, useRouter } from 'next/navigation'
import { SaveButton } from '../../SaveButton'
import { BillInfo } from './BillInfo'
import { ParticipantsInfo } from './ParticipantsInfo'
import { useCalculateContext } from '../../../context/CalculateContext'
import { CalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { createRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/createRentalGroupRegister'
import { handleResponse } from '@/utilities/handleResponse'
import { ROUTE } from '@/constants/routes'

export function AddRegisterForm() {
  const { results, useFormHook } = useCalculateContext()
  const { handleSubmit } = useFormHook

  const { push } = useRouter()
  const params = useParams()

  const { rentalGroupId } = params as { rentalGroupId: string }

  async function handleSave(data: CalculateResultsAdd) {
    const res = await createRentalGroupRegister({
      billData: { ...data.billData, rental_group_id: Number(rentalGroupId) },
      results: results.map(result => ({
        ...result.result,
        tenant_id: result.tenant.id!,
        // TODO
      })),
    })

    await handleResponse({
      res,
      onSuccess: () => {
        push(ROUTE.GROUPS.REGISTERS.INDEX({ id: rentalGroupId }))
      },
    })
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
