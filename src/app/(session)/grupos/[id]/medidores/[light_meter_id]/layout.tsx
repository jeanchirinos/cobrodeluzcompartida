import { Tabs } from './components/Tabs'

export default async function Layout(props: React.PropsWithChildren) {
  return (
    <main className='flex flex-col gap-y-6 !px-0 main-container'>
      <div className='flex gap-x-6'>
        <Tabs />
        {props.children}
      </div>
    </main>
  )
}
