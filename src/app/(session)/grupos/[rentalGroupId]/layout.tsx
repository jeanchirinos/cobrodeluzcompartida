import { Tabs } from './components/Tabs'
import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'

import { Metadata } from 'next'
import { RentalGroupName } from './components/RentalGroupName'

export const metadata: Metadata = {
  title: {
    template: 'Grupo - %s | CLC',
    default: 'Grupo',
  },
}

export default async function Layout(props: React.PropsWithChildren) {
  return (
    <main className='flex flex-col gap-y-6 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.INDEX} />
        <RentalGroupName />
      </section>
      <Tabs />
      {props.children}
    </main>
  )
}
