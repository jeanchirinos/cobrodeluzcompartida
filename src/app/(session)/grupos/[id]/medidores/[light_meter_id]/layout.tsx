import { ButtonBack } from '@/components/Button/ButtonBack'
import { Tabs } from './components/Tabs'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { Link } from '@/components/Link'
import { getParticipantById } from '@/controllers/ParticipantController/getParticipantById'
import { Suspense } from '@/components/other/CustomSuspense'
import { Participant } from '@/models/Participant'
import { ParticipantProvider } from './context/ParticipantContext'

type LayoutProps = React.PropsWithChildren & PagePropsParams<'id' | 'light_meter_id'>

export default async function Layout(props: LayoutProps) {
  const { id: rentalGroupId, light_meter_id } = props.params

  return (
    <main className='flex flex-col gap-y-6 !px-0 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.LIGHT_METERS.INDEX({ groupId: rentalGroupId })} />
        <Suspense>
          <ParticipantName lightMeterId={Number(light_meter_id)} />
        </Suspense>
      </section>
      <Link
        href={ROUTE.GROUPS.LIGHT_METERS.ID({ groupId: rentalGroupId, id: light_meter_id })}
        className='px-3 md:hidden'
      >
        Menú
      </Link>
      <div className='relative flex gap-x-6'>
        <Tabs />
        <Suspense>
          <Content lightMeterId={Number(light_meter_id)}>{props.children}</Content>
        </Suspense>
      </div>
    </main>
  )
}

async function ParticipantName(props: { lightMeterId: Participant['id'] }) {
  const { participant } = await getParticipantById({ id: props.lightMeterId })

  return <h2 className='text-xl font-bold'>{participant.alias}</h2>
}

async function Content(props: React.PropsWithChildren & { lightMeterId: Participant['id'] }) {
  const getParticipantByIdResponse = await getParticipantById({ id: props.lightMeterId })

  return <ParticipantProvider value={getParticipantByIdResponse}>{props.children}</ParticipantProvider>
}
