'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { useState } from 'react'
import { BillInfo } from './Calculate/Form/BillInfo'
import { FieldWithData, ParticipantsInfo } from './Calculate/Form/ParticipantsInfo'
import { Results } from './Calculate/Results'
import { SessionWarning } from './SessionWarning/SessionWarning'

export function Calculate() {
  const [results, setResults] = useState<ResultRow[]>([])
  const [fieldsWithData, setFieldsWithData] = useState<FieldWithData[]>([])

  return (
    <>
      <SessionWarning results={results} />
      <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
        <form className='flex gap-12 max-lg:flex-col'>
          <BillInfo />
          <ParticipantsInfo setFieldsWithData={setFieldsWithData} />
        </form>
        <Results results={results} setResults={setResults} fieldsWithData={fieldsWithData} />
      </section>
    </>
  )
}
