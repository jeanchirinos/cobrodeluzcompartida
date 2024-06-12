import { type PropsWithChildren } from 'react'
import { Tabs } from './components/Tabs'

export default async function Layout(props: PropsWithChildren) {
  return (
    <main className='flex gap-x-6 !px-0 main-container'>
      <Tabs />
      {props.children}
    </main>
  )
}
