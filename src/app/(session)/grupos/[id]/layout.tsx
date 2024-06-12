import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { Tabs } from './components/Tabs'
import { RentalGroupProvider } from './context/RentalGroupContext'
import { type PropsWithChildren } from 'react'
import { type PagePropsParams } from '@/types'

type Props = PropsWithChildren & PagePropsParams<'id'>

export default async function Layout(props: Props) {
  const getRentalGroupByIdResponse = await getRentalGroupById({ id: Number(props.params.id) })
  const { rentalGroup } = getRentalGroupByIdResponse

  return (
    <RentalGroupProvider value={getRentalGroupByIdResponse}>
      <main className='flex flex-col gap-y-6 main-container'>
        <h1 className='text-2xl font-bold'>{rentalGroup?.name}</h1>
        <Tabs />
        {props.children}
      </main>
    </RentalGroupProvider>
  )
}
