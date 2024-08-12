import { Metadata } from 'next'
import { ParticipantsCards } from './components/ParticipantsCards'
import { AddParticipant } from './components/AddParticipant'

export const metadata: Metadata = {
  title: 'Medidores',
}

export default function Page() {
  return (
    <div className='flex flex-col gap-y-6'>
      <AddParticipant />
      <ParticipantsCards />
    </div>
  )
}
