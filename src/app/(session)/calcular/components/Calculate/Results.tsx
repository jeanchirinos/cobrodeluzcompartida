'use client'

import { useCalculateContext } from '../../context/CalculateContext'
import { ResultsTable } from '@/components/other/ResultsTable'

export function Results() {
  const { results } = useCalculateContext()

  return (
    <section className='space-y-10'>
      <h3 className='text-large font-semibold'>Resultados</h3>
      <ResultsTable results={results} />
    </section>
  )
}
