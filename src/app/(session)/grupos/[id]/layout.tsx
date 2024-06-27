import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { Tabs } from './components/Tabs'
import { RentalGroupProvider } from './context/RentalGroupContext'
import { type PagePropsParams } from '@/types'
import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'
import { RentalGroup } from '@/models/RentalGroup'
import { Suspense } from '@/components/other/CustomSuspense'

type Props = React.PropsWithChildren & PagePropsParams<'id'>

export default async function Layout(props: Props) {
  const { id: rentalGroupId } = props.params

  return (
    <main className='flex flex-col gap-y-6 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.INDEX} />
        <Suspense>
          <RentalGroupName rentalGroupId={Number(rentalGroupId)} />
        </Suspense>
      </section>
      <Tabs />
      <Suspense>
        <Content rentalGroupId={Number(rentalGroupId)}>{props.children}</Content>
      </Suspense>
    </main>
  )
}

async function RentalGroupName(props: { rentalGroupId: RentalGroup['id'] }) {
  const { rentalGroup } = await getRentalGroupById({ id: props.rentalGroupId })

  return <h1 className='text-2xl font-bold'>{rentalGroup.name}</h1>
}

async function Content(props: React.PropsWithChildren & { rentalGroupId: RentalGroup['id'] }) {
  const getRentalGroupByIdResponse = await getRentalGroupById({ id: props.rentalGroupId })

  return <RentalGroupProvider value={getRentalGroupByIdResponse}>{props.children}</RentalGroupProvider>
}
