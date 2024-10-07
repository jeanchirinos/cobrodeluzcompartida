import { type Metadata } from 'next'
import { Calculate } from './components/Calculate'
import { CalculateFormProvider } from './components/CalculateFormProvider'

export const metadata: Metadata = {
  title: 'Calcular',
}

export default function Page() {
  return (
    <main className='flex flex-col gap-y-10 main-container'>
      <CalculateFormProvider>
        <Calculate />
      </CalculateFormProvider>
    </main>
  )
}
