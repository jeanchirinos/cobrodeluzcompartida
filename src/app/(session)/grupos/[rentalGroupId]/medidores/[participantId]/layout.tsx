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

type LayoutProps = React.PropsWithChildren & PagePropsParams<'rentalGroupId'>

export default async function Layout(props: LayoutProps) {
  const { rentalGroupId } = await props.params

  return (
    <main className='main-container flex flex-col gap-y-6 !px-0'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId })} />
        <ParticipantName />
      </section>
      <ParticipantTabs classNames={{ base: 'md:hidden' }} />

      <div className='relative flex gap-x-6'>
        <ParticipantTabs isVertical classNames={{ tabWrapper: 'max-md:hidden' }} />
        {props.children}
      </div>
    </main>
  )
}
