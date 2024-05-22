import { CreateRentalGroupRegisterBody } from '@/controllers/RentalGroupRegisterController/utils/types'

type Params = {
  billData: CreateRentalGroupRegisterBody['billData']
  consumptions: {
    consumption_kwh: number
    participant: {
      alias: string
      is_main: false
    }
  }[]
}

const IGV = 1.18

export function getResult(params: Params): CreateRentalGroupRegisterBody {
  const { billData, consumptions } = params

  const { consumption_kwh, kwh_price, current_month_total, total } = billData

  const quantityOfConsumptions = consumptions.length + 1

  const amountToBeAddedBeforeSubtotalWithIgv =
    (Number(current_month_total) / IGV - Number(consumption_kwh) * Number(kwh_price)) /
    quantityOfConsumptions

  const amountToAddAfterSubtotalWithIgv =
    (Number(total) - Number(current_month_total)) / quantityOfConsumptions

  const adminConsumptionKwh =
    Number(consumption_kwh) -
    consumptions.reduce((acc, item) => acc + Number(item.consumption_kwh), 0)

  function calculateAmountPerParticipant(consumption_kwh: number) {
    return Number(
      (
        (consumption_kwh * Number(kwh_price) + amountToBeAddedBeforeSubtotalWithIgv) * IGV +
        amountToAddAfterSubtotalWithIgv
      ).toFixed(1)
    )
  }

  const adminAmount = calculateAmountPerParticipant(adminConsumptionKwh)

  const participantsAmounts = consumptions.map(item => ({
    ...item,
    amount: calculateAmountPerParticipant(Number(item.consumption_kwh)),
  }))

  const results = [
    {
      consumption_kwh: adminConsumptionKwh,
      amount: adminAmount,
      participant: { alias: 'Principal', is_main: true },
    },
    ...participantsAmounts,
  ]

  return {
    billData,
    results,
  }
}
