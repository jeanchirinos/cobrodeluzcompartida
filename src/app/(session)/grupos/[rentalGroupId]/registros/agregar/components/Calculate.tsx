'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { useState } from 'react'
import { SelectMonth, SelectYear } from './Selects'
import { AddRegisterForm } from './Calculate/Form/AddRegisterForm'
import { Results } from './Calculate/Results'
import { FieldWithData } from './Calculate/Form/ParticipantsInfo'

export function Calculate() {
  const [results, setResults] = useState<ResultRow[]>([])
  const [fieldsWithData, setFieldsWithData] = useState<FieldWithData[]>([])

  return (
    <>
      <section className='flex flex-wrap gap-4'>
        <SelectYear />
        <SelectMonth />
      </section>
      <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
        <AddRegisterForm results={results} setFieldsWithData={setFieldsWithData} />
        <Results results={results} setResults={setResults} fieldsWithData={fieldsWithData} />
      </section>
    </>
  )
}
