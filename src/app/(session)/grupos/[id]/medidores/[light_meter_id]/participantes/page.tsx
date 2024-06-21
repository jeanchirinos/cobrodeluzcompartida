import { Suspense } from '@/components/other/CustomSuspense'
// import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { Participant } from '@/models/Participant'
import { PagePropsParams } from '@/types'

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
  const { light_meter_id } = props

  return <h1>{light_meter_id} - Participantes</h1>
  // const { participants: light_meters } = await getParticipants({
  //   rentalGroupId,
  // })

  // const currentLightMeter = light_meters.find(light_meter => light_meter.id === light_meter_id) ?? light_meters[0]

  // return <h1>{currentLightMeter.alias}</h1>
}
