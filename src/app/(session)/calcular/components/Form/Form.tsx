import { Button } from '@nextui-org/button'
import { BillInfo } from './BillInfo'
import { LightMetersInfo } from './LightMetersInfo'
import { useState } from 'react'
import { SetState } from '@/app/types'
import { getResult } from '../../utils/calculateAmount'

type Props = { setResult: SetState<Result> }

export function Form(props: Props) {
  const { setResult } = props

  // STATES
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true)

  // FUNCTIONS
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const formProps = Object.fromEntries(formData) as {
      consumption: string
      kwh: string
      totalMonth: string
      totalAmount: string
      consumption1: string
    }

    const { consumption1, ...rest } = formProps

    const result = getResult({
      ...rest,
      consumptions: [{ name: 'Consumo 1', amount: consumption1 }],
    })

    setResult(result)
  }

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget)
    const formProps = Object.values(Object.fromEntries(formData))

    if (formProps.length < 5 || formProps.includes('')) {
      setSubmitButtonIsDisabled(true)
    } else {
      setSubmitButtonIsDisabled(false)
    }
  }

  // RENDER
  return (
    <form className='space-y-unit-2xl' onSubmit={handleSubmit} onChange={handleChange}>
      <BillInfo />
      <LightMetersInfo />

      <Button
        type='submit'
        color='primary'
        fullWidth
        variant='shadow'
        isDisabled={submitButtonIsDisabled}
      >
        Calcular
      </Button>
    </form>
  )
}
