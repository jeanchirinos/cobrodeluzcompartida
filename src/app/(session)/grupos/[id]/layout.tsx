import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { Tabs } from './components/Tabs'

export default async function Layout(props: React.PropsWithChildren & { params: { id: string } }) {
  const rentalGroup = await getRentalGroupById(props.params.id)

  return (
    <main className='main-container space-y-6'>
      <h1 className='font-bold text-2xl'>{rentalGroup?.name}</h1>
      <Tabs />
      {props.children}
    </main>
  )
}
