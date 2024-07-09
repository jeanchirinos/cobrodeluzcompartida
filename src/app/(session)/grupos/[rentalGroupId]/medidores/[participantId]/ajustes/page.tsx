import { Metadata } from 'next'
import { DeleteParticipant } from './components/DeleteParticipant'
import { UpdateParticipantAvailability } from './components/UpdateParticipantAvailability'
import { UpdateParticipant } from './components/UpdateParticipant'

export const metadata: Metadata = {
  title: 'Ajustes',
}

export default function Page() {
  return (
    <main className='flex flex-col gap-y-12'>
      <UpdateParticipant />
      <UpdateParticipantAvailability />
      <DeleteParticipant />
    </main>
  )
}
