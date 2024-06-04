import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { Tabs } from './components/Tabs'
import { RentalGroupProvider } from './context/RentalGroupContext'
import { type PropsWithChildren } from 'react'
import { type PagePropsParams } from '@/types'

type Props = PropsWithChildren & PagePropsParams<'id'>

export default async function Layout(props: Props) {
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
