'use client'

import { useState } from 'react'
import { Form } from './Form/Form'
import { Results } from './Results'

export function Calculate() {
  const [result, setResult] = useState<Result>(null)

  return (
    <>
      <section className='flex gap-14 lg:gap-x-16 max-md:flex-col'>
        <Form setResult={setResult} />
        <Results result={result} />
      </section>
    </>
  )
}
