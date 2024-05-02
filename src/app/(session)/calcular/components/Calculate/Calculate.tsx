'use client'

import { useState } from 'react'
import { Form } from './Form/Form'
import { Results } from './Results'
import { CreateRentalGroupRegisterBody } from '@/controllers/RentalGroupRegisterController/utils/types'

export function Calculate() {
  const [result, setResult] = useState<CreateRentalGroupRegisterBody | null>(null)

  return (
    <>
      <section className='flex gap-14 lg:gap-x-16 max-md:flex-col'>
        <Form setResult={setResult} />
        <Results result={result} />
      </section>
    </>
  )
}
