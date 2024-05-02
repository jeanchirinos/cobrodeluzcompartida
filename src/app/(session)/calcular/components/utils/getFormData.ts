import { $FORM_CALCULATE_ID } from '@/constants/elements'

export function getFormData() {
  const formCalculate = document.getElementById($FORM_CALCULATE_ID) as HTMLFormElement

  const formData = new FormData(formCalculate)

  const consumptions = Array.from(formData)
    .filter(([key, value]) => key.startsWith('participant_consumption_'))
    .map(([key, value]) => ({
      consumption_kwh: Number(value),
      participant: {
        alias: `Consumo ${key.split('_').at(-1)}`,
        is_main: false,
      },
    }))

  const billDataPropsArray = Array.from(formData).filter(
    ([key, value]) => !key.startsWith('participant_consumption_')
  )

  const billData = Object.fromEntries(billDataPropsArray)

  return {
    billData,
    consumptions,
  }
}
