import { DeleteLightMeter } from './components/DeleteLightMeter'
import { UpdateAvailability } from './components/UpdateAvailability'
import { UpdateLightMeter } from './components/UpdateLightMeter'

export default function Page() {
  return (
    <main className='flex flex-col gap-y-12'>
      <UpdateLightMeter />
      <UpdateAvailability />
      <DeleteLightMeter />
    </main>
  )
}
