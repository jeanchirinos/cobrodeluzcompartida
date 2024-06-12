import { Button } from '@nextui-org/button'
import { BillInfo } from './BillInfo'
import { LightMetersInfo } from './LightMetersInfo'
import { useState } from 'react'
import { SetState } from '@/types'
import { getResult } from './utils/calculateAmount'
import { $FORM_CALCULATE_ID } from '@/constants/elements'
import { getFormData } from '../../utils/getFormData'
import { CreateRentalGroupRegisterBody } from '@/controllers/RentalGroupRegisterController/utils/types'

type Props = { setResult: SetState<CreateRentalGroupRegisterBody | null> }

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

    const formData = getFormData()
    const result = getResult(formData as any)

    setResult(result)
  }

  // RENDER
  return (
    <form
      className='max-w-64 space-y-10'
      id={$FORM_CALCULATE_ID}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
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
