import { Metadata } from 'next'
import { DeleteGroup } from './components/DeleteGroup'
import { UpdateGroup } from './components/UpdateGroup'

export const metadata: Metadata = {
  title: 'Ajustes',
}

export default function Page() {
  return (
    <main className='flex flex-col items-start gap-y-12 !px-0 main-container'>
      <UpdateGroup />
      <DeleteGroup />
    </main>
  )
}
