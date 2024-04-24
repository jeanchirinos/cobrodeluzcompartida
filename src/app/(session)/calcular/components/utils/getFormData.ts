import { $FORM_CALCULATE } from '@/elements'

export function getFormData() {
  const formCalculate = document.getElementById($FORM_CALCULATE) as HTMLFormElement

  const formData = new FormData(formCalculate)

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

  return {
    ...billData,
    consumptions,
  }
}
