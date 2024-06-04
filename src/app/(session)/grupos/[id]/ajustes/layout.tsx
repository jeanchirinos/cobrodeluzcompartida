import { type PropsWithChildren } from 'react'
import { Tabs } from './components/Tabs'

export default async function Layout(props: PropsWithChildren) {
  return (
    <main className='main-container !px-0 flex gap-x-6'>
      <Tabs />
      {props.children}
    </main>
  )
}
