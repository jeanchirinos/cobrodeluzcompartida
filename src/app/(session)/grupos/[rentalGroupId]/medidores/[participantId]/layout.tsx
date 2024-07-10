import { ButtonBack } from '@/components/Button/ButtonBack'
import { ParticipantTabs } from './components/ParticipantTabs'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
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
      <ParticipantTabs classNames={{ base: 'md:hidden' }} />

      <div className='relative flex gap-x-6'>
        <ParticipantTabs isVertical classNames={{ wrapper: 'max-md:hidden' }} />
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
