'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { BillInfo } from './Calculate/Form/BillInfo'
import { ParticipantsInfo } from './Calculate/Form/ParticipantsInfo'
import { Results } from './Calculate/Results'
import { MyFormProvider } from './MyFormProvider'
import { SessionWarning } from './SessionWarning/SessionWarning'
import { useState } from 'react'

export function Calculate() {
  const [results, setResults] = useState<ResultRow[]>([])

  return (
    <MyFormProvider>
      <SessionWarning results={results} />
      <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
        <form className='flex gap-12 max-lg:flex-col'>
          <BillInfo />
          <ParticipantsInfo />
        </form>
        <Results results={results} setResults={setResults} />
      </section>
    </MyFormProvider>
  )
}
