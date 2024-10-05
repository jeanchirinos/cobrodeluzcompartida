import { type Metadata } from 'next'
import { Calculate } from './components/Calculate'

export const metadata: Metadata = {
  title: 'Calcular',
}

export default function Page() {
  return (
    <main className='flex flex-col gap-y-10 main-container'>
      <Calculate />
    </main>
  )
}
