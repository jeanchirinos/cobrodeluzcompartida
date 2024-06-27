import { DeleteParticipant } from './components/DeleteParticipant'
import { UpdateAvailability } from './components/UpdateAvailability'
import { UpdateLightMeter } from './components/UpdateLightMeter'

export default function Page() {
  return (
    <main className='flex flex-col gap-y-12'>
      <UpdateLightMeter />
      <UpdateAvailability />
      <DeleteParticipant />
    </main>
  )
}
