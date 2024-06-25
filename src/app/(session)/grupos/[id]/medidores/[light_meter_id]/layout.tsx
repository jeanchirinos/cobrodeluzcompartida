import { ButtonBack } from '@/components/Button/ButtonBack'
import { Tabs } from './components/Tabs'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'

type LayoutProps = React.PropsWithChildren & PagePropsParams<'id'>

export default async function Layout(props: LayoutProps) {
  return (
    <main className='flex flex-col gap-y-6 !px-0 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.LIGHT_METERS.INDEX({ groupId: props.params.id })} />
        <h2 className='text-xl font-bold'>Medidor 1</h2>
      </section>
      <div className='flex gap-x-6'>
        <Tabs />
        {props.children}
      </div>
    </main>
  )
}
