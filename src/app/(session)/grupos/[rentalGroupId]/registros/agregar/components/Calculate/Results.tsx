'use client'

import { ResultsTable } from '@/components/other/ResultsTable/ResultsTable'
import { useCalculateContext } from '../../context/CalculateContext'

export function Results() {
  const { results } = useCalculateContext()

  return (
    <section className='sticky top-40 space-y-10'>
      <h3 className='text-large font-semibold'>Resultados</h3>
      <ResultsTable results={results} />
    </section>
  )
}
