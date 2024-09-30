import { Results } from './components/Calculate/Results'
import { BillInfo } from './components/Calculate/Form/BillInfo'
import { ParticipantsInfo } from './components/Calculate/Form/ParticipantsInfo'
import { type Metadata } from 'next'
import { MyFormProvider } from './components/MyFormProvider'
import { SessionWarning } from './components/SessionWarning/SessionWarning'

export const metadata: Metadata = {
  title: 'Calcular',
}

export default function Page() {
  return (
    <main className='flex flex-col gap-y-10 main-container'>
      <MyFormProvider>
        <SessionWarning />
        <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
          <form className='flex gap-12 max-lg:flex-col'>
            <BillInfo />
            <ParticipantsInfo />
          </form>
          <Results />
        </section>
      </MyFormProvider>
    </main>
  )
}
