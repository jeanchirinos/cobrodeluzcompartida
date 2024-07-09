import { ButtonBack } from '@/components/Button/ButtonBack'
import { Tabs } from './components/Tabs'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { Link } from '@/components/Link'
import { getParticipantById } from '@/controllers/ParticipantController/getParticipantById'
import { Suspense } from '@/components/other/CustomSuspense'
import { Participant } from '@/models/Participant'
import { ParticipantProvider } from './context/ParticipantContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: 'Medidor - %s | CLC',
    default: 'Medidor',
  },
}

type LayoutProps = React.PropsWithChildren & PagePropsParams<'rentalGroupId' | 'participantId'>

export default function Layout(props: LayoutProps) {
  const { rentalGroupId, participantId } = props.params

  return (
    <main className='flex flex-col gap-y-6 !px-0 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId })} />
        <Suspense>
          <ParticipantName participantId={Number(participantId)} />
        </Suspense>
      </section>
      <Link href={ROUTE.GROUPS.PARTICIPANTS.ID({ rentalGroupId, id: participantId })} className='px-3 md:hidden'>
        Menú
      </Link>
      <div className='relative flex gap-x-6'>
        <Tabs />
        <Suspense>
          <Content participantId={Number(participantId)}>{props.children}</Content>
        </Suspense>
      </div>
    </main>
  )
}

async function ParticipantName(props: { participantId: Participant['id'] }) {
  const { participant } = await getParticipantById({ id: props.participantId })

  return <h2 className='text-xl font-bold'>{participant.alias}</h2>
}

async function Content(props: React.PropsWithChildren & { participantId: Participant['id'] }) {
  const getParticipantByIdResponse = await getParticipantById({ id: props.participantId })

  return <ParticipantProvider value={getParticipantByIdResponse}>{props.children}</ParticipantProvider>
}
