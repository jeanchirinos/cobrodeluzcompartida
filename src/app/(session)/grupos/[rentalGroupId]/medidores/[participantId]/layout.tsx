import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { Metadata } from 'next'
import { ParticipantName } from './components/ParticipantName'
import { ParticipantTabs } from './components/ParticipantTabs'

export const metadata: Metadata = {
  title: {
    template: 'Medidor - %s | CLC',
    default: 'Medidor',
  },
}

type LayoutProps = React.PropsWithChildren & PagePropsParams<'rentalGroupId' | 'participantId'>

export default function Layout(props: LayoutProps) {
  const { rentalGroupId } = props.params

  return (
    <main className='flex flex-col gap-y-6 !px-0 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId })} />
        <ParticipantName />
      </section>
      <ParticipantTabs classNames={{ base: 'md:hidden' }} />

      <div className='relative flex gap-x-6'>
        <ParticipantTabs isVertical classNames={{ wrapper: 'max-md:hidden' }} />
        {props.children}
      </div>
    </main>
  )
}
