import { Metadata } from 'next'
import { CreateRentalGroup } from './components/CreateRentalGroup'
import { RentalGroups } from './components/RentalGroups'

export const metadata: Metadata = {
  title: 'Grupos',
}

export default function Page() {
  return (
    <main className='space-y-4 main-container'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Grupos</h1>
        <CreateRentalGroup />
      </header>
      <div className='flex flex-wrap gap-4'>
        <RentalGroups />
      </div>
    </main>
  )
}
