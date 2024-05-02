import { Suspense } from '@/components/other/CustomSuspense'
import { Calculate } from './components/Calculate/Calculate'
import { SessionWarning } from './components/SessionWarning/SessionWarning'
import { getSession } from '@/controllers/AuthController/getSession'
import { redirect } from 'next/navigation'
import { ROUTE } from '@/routes'

export default async function Page() {
  const session = await getSession()

  if (session) redirect(ROUTE.GROUPS.INDEX)

  return (
    <main className='main-container flex flex-col gap-y-10'>
      <Suspense>
        <SessionWarning />
      </Suspense>
      <Calculate />
    </main>
  )
}
