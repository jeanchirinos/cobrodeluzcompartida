import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { Tabs } from './components/Tabs'
import { RentalGroupProvider } from './context/RentalGroupContext'
import { type PagePropsParams } from '@/types'
import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'

type Props = React.PropsWithChildren & PagePropsParams<'id'>

export default async function Layout(props: Props) {
  const getRentalGroupByIdResponse = await getRentalGroupById({ id: Number(props.params.id) })
  const { rentalGroup } = getRentalGroupByIdResponse

  return (
    <RentalGroupProvider value={getRentalGroupByIdResponse}>
      <main className='flex flex-col gap-y-6 main-container'>
        <section className='flex items-center gap-x-2'>
          <ButtonBack href={ROUTE.GROUPS.INDEX} />
          <h1 className='text-2xl font-bold'>{rentalGroup.name}</h1>
        </section>
        <Tabs />
        {props.children}
      </main>
    </RentalGroupProvider>
  )
}
