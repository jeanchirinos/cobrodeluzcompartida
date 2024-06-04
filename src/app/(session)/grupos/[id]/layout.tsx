import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { Tabs } from './components/Tabs'
import { RentalGroupProvider } from './context/RentalGroupContext'
// import { PropsWithChildren } from 'react'
// import { PageProps } from '@/types'

// type Props = PropsWithChildren & PageProps<'id'>

export default async function Layout(props: any) {
  const getRentalGroupByIdResponse = await getRentalGroupById({ id: props.params.id })
  const { rentalGroup } = getRentalGroupByIdResponse

  return (
    <RentalGroupProvider value={getRentalGroupByIdResponse}>
      <main className='main-container space-y-6'>
        <h1 className='font-bold text-2xl'>{rentalGroup?.name}</h1>
        <Tabs />
        {props.children}
      </main>
    </RentalGroupProvider>
  )
}
