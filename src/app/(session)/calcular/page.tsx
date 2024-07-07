import { Suspense } from '@/components/other/CustomSuspense'
import { SessionWarning } from './components/SessionWarning/SessionWarning'
import { CalculateProvider } from './context/CalculateContext'
import { Results } from './components/Calculate/Results'
import { BillInfo } from './components/Calculate/Form/BillInfo'
import { LightMetersInfo } from './components/Calculate/Form/LightMetersInfo'

export default async function Page() {
  return (
    <main className='flex flex-col gap-y-10 main-container'>
      <CalculateProvider>
        <Suspense>
          <SessionWarning />
        </Suspense>
        <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
          <form className='flex gap-12 max-sm:flex-col'>
            <BillInfo />
            <LightMetersInfo />
          </form>
          <Results />
        </section>
      </CalculateProvider>
    </main>
  )
}
