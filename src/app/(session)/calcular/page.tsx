import { Suspense } from '@/components/other/CustomSuspense'
import { Calculate } from './components/Calculate/Calculate'
import { SessionWarning } from './components/SessionWarning/SessionWarning'

export default function Page() {
  return (
    <main className='main-container flex flex-col gap-y-10'>
      <Suspense>
        <SessionWarning />
      </Suspense>
      <Calculate />
    </main>
  )
}
