import { ButtonBack } from '@/components/Button/ButtonBack'
import { Tabs } from './components/Tabs'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { Link } from '@/components/Link'

type LayoutProps = React.PropsWithChildren & PagePropsParams<'id' | 'light_meter_id'>

export default async function Layout(props: LayoutProps) {
  const { id: rentalGroupId, light_meter_id } = props.params

  return (
    <main className='flex flex-col gap-y-6 !px-0 main-container'>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.LIGHT_METERS.INDEX({ groupId: rentalGroupId })} />
        <h2 className='text-xl font-bold'>Medidor 1</h2>
      </section>
      <Link
        href={ROUTE.GROUPS.LIGHT_METERS.ID({ groupId: rentalGroupId, id: light_meter_id })}
        className='px-3 md:hidden'
      >
        Menú
      </Link>
      <div className='relative flex gap-x-6'>
        <Tabs />
        {props.children}
      </div>
    </main>
  )
}
