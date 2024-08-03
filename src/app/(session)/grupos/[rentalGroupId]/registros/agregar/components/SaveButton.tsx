'use client'

import { useCalculateContext } from '../context/CalculateContext'
import { createRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupRegister/createRentalGroupRegister'
import { handleResponse } from '@/utilities/handleResponse'
import { useParams, useRouter } from 'next/navigation'
import { ROUTE } from '@/constants/routes'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'

export function SaveButton() {
  const { results, useFormHook } = useCalculateContext()
  const { getValues, handleSubmit } = useFormHook

  const { push } = useRouter()
  const params = useParams()
  const { rentalGroupId } = params as { rentalGroupId: string }

  async function handleSave() {
    const res = await createRentalGroupRegister({
      billData: getValues().billData,
      rental_group_id: Number(rentalGroupId),
      results: results.map(result => ({
        ...result,
        tenant_id: result.tenant.id,
      })),
    })

    await handleResponse({
      res,
      onSuccess: () => {
        push(ROUTE.GROUPS.REGISTERS.INDEX({ id: rentalGroupId }))
      },
    })

    // const cookiesFormDataAndResults: CookiesFormDataAndResults = {
    //   billData: getValues().billData,
    //   results,
    // }
  }

  return (
    <HookFormButton useFormHook={{ ...useFormHook, onSubmit: handleSubmit(handleSave) }} className='w-fit'>
      Guardar registro
    </HookFormButton>
  )
}
