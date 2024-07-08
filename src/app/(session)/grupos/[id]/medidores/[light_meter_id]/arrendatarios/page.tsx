import { Suspense } from '@/components/other/CustomSuspense'
import { Participant } from '@/models/Participant'
import { PagePropsParams } from '@/types'
import { TenantsTable } from './components/TenantsTable'
import { getTenants } from '@/controllers/TenatController/getTenants'
import { Metadata } from 'next'
import { ButtonAction } from '@/components/Button/ButtonAction'
import { createTenant } from '@/controllers/TenatController/createTenant/createTenant'
import { IconAdd } from '@/icons'

export const metadata: Metadata = {
  title: 'Arrendatarios',
}

type Props = PagePropsParams<'light_meter_id'>

export default function Page(props: Props) {
  const { light_meter_id } = props.params

  return (
    <div className='flex w-full flex-col gap-y-4'>
      <ButtonAction
        action={createTenant}
        actionParameters={{ participant_id: Number(light_meter_id) }}
        color='primary'
        className='w-fit self-end'
        endContent={<IconAdd />}
      >
        Agregar arrendatario
      </ButtonAction>
      <Suspense>
        <Tenants light_meter_id={Number(light_meter_id)} />
      </Suspense>
    </div>
  )
}

async function Tenants(props: { light_meter_id: Participant['id'] }) {
  const { tenants } = await getTenants({
    lightMeterId: props.light_meter_id,
  })

  return (
    <div className='flex w-fit max-w-full flex-col items-center gap-y-12'>
      <TenantsTable tenants={tenants} />
    </div>
  )
}
