import { Suspense } from '@/components/other/CustomSuspense'
import { Participant } from '@/models/Participant'
import { PagePropsParams } from '@/types'
import { TenantsTable } from './components/TenantsTable'
import { getTenants } from '@/controllers/TenatController/getTenants'
import { Metadata } from 'next'
import { ButtonAction } from '@/components/Button/ButtonAction'
import { createTenant } from '@/controllers/TenatController/createTenant/createTenant'
import { IconAdd } from '@/icons'
import { SuspenseFallback } from '@/components/other/SuspenseFallback'

export const metadata: Metadata = {
  title: 'Inquilinos',
}

type Props = PagePropsParams<'participantId'>

export default function Page(props: Props) {
  const { participantId } = props.params

  return (
    <div className='flex w-full flex-col gap-y-4'>
      <ButtonAction
        action={createTenant}
        actionParameters={{ participant_id: Number(participantId) }}
        color='primary'
        className='w-fit self-end'
        endContent={<IconAdd />}
      >
        Agregar inquilino
      </ButtonAction>
      <Suspense fallback={<SuspenseFallback />}>
        <Tenants participantId={Number(participantId)} />
      </Suspense>
    </div>
  )
}

async function Tenants(props: { participantId: Participant['id'] }) {
  const { tenants } = await getTenants({
    participantId: props.participantId,
  })

  return (
    <div className='flex w-fit max-w-full flex-col items-center gap-y-12'>
      <TenantsTable tenants={tenants} />
    </div>
  )
}
