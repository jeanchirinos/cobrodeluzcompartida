import { Button } from '@nextui-org/button'
import { BillInfo } from './BillInfo'
import { LightMetersInfo } from './LightMetersInfo'
import { useState } from 'react'
import { SetState } from '@/types'
import { getResult } from '../../../utils/calculateAmount'

type Props = { setResult: SetState<Result> }

export function Form(props: Props) {
  const { setResult } = props

  // STATES
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true)

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget)
    const formProps = Object.values(Object.fromEntries(formData))

    if (formProps.length < 5 || formProps.includes('')) {
      setSubmitButtonIsDisabled(true)
    } else {
      setSubmitButtonIsDisabled(false)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // console.log({ a: formData.forEach((value, key) => console.log(key, value)) })

    const consumptions = Array.from(formData)
      .filter(([key, value]) => key.startsWith('consumption_'))
      .map(([key, value]) => ({
        name: `Consumo ${key.split('_').at(-1)}`,
        amount: value as string,
      }))

    const billDataPropsArray = Array.from(formData).filter(
      ([key, value]) => !key.startsWith('consumption_')
    )

    const billData = Object.fromEntries(billDataPropsArray) as {
      consumption: string
      kwh: string
      totalMonth: string
      totalAmount: string
    }

    const result = getResult({
      ...billData,
      consumptions,
    })

    setResult(result)
  }

  // RENDER
  return (
    <form className='space-y-10 max-w-64' onChange={handleChange} onSubmit={handleSubmit}>
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
