import { Suspense } from '@/components/other/CustomSuspense'
import { Participant } from '@/models/Participant'
import { PagePropsParams } from '@/types'
import { TenantsTable } from './components/TenantsTable'
import { getTenants } from '@/controllers/TenatController/getTenants'

type Props = PagePropsParams<'light_meter_id'>

export default function Page(props: Props) {
  const { light_meter_id } = props.params

  return (
    <Suspense>
      <Tenants light_meter_id={Number(light_meter_id)} />
    </Suspense>
  )
}

async function Tenants(props: { light_meter_id: Participant['id'] }) {
  const { tenants } = await getTenants({
    lightMeterId: props.light_meter_id,
  })

  return (
    <div className='flex max-w-full flex-col items-center gap-y-12'>
      <TenantsTable tenants={tenants} />
    </div>
  )
}
