'use client'

import { useState } from 'react'
import { Form } from './components/Form/Form'
import { Results } from './components/Results'

export default function Page() {
  const [result, setResult] = useState<Result>(null)

  return (
    <main className='main-container flex gap-unit-4xl lg:gap-x-unit-5xl max-md:flex-col'>
      <Form setResult={setResult} />
      <Results result={result} />
    </main>
  )
}
