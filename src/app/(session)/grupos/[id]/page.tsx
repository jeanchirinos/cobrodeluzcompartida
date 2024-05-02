import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import {
  GetRentalGroupRegisterParams,
  getRentalGroupRegister,
} from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister'
import { PageParamsAndSearchParamsPropsAlt } from '@/types'

type Props = PageParamsAndSearchParamsPropsAlt<'id', GetRentalGroupRegisterParams>

export default async function Page(props: Props) {
  const rentalGroup = await getRentalGroupById(props.params.id)
  const rentalGroupRegister = await getRentalGroupRegister({
    params: { rentalGroupId: Number(props.params.id) },
    searchParams: props.searchParams,
  })

  if (!rentalGroup || !rentalGroupRegister) return null

  return (
    <>
      <h1>{rentalGroup.name}</h1>
      <pre>{JSON.stringify(rentalGroupRegister, null, 2)}</pre>
    </>
  )
}
