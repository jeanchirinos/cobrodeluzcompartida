import { Suspense } from '@/components/other/CustomSuspense'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { Participant } from '@/models/Participant'
import { PagePropsParams } from '@/types'
import { ParticipantsTable } from './components/ParticipantsTable'

type Props = PagePropsParams<'light_meter_id'>

export default function Page(props: Props) {
  const { light_meter_id } = props.params

  return (
    <Suspense>
      <Participants light_meter_id={Number(light_meter_id)} />
    </Suspense>
  )
}

async function Participants(props: { light_meter_id: Participant['id'] }) {
  const { participants } = await getParticipants({
    rentalGroupId: 70,
  })

  return (
    <div className='flex max-w-full flex-col items-center gap-y-12'>
      <ParticipantsTable participants={participants} />
    </div>
  )
}
