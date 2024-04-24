type Params = {
  consumption: string
  kwh: string
  totalMonth: string
  totalAmount: string
  consumptions: {
    name: string
    amount: string
  }[]
}

const IGV = 1.18

export function getResult(params: Params) {
  const { consumption, kwh, totalMonth, totalAmount, consumptions } = params

  const quantityOfConsumptions = consumptions.length + 1

  const amountToAddedBeforeSubtotalWithIgv =
    (Number(totalMonth) / IGV - Number(consumption) * Number(kwh)) / quantityOfConsumptions

  const amountToAddAfterSubtotalWithIgv =
    (Number(totalAmount) - Number(totalMonth)) / quantityOfConsumptions

  const adminConsumption =
    Number(consumption) - consumptions.reduce((acc, item) => acc + Number(item.amount), 0)

  function calculateAmountPerParticipant(consumption: number) {
    return Number(
      (
        (consumption * Number(kwh) + amountToAddedBeforeSubtotalWithIgv) * IGV +
        amountToAddAfterSubtotalWithIgv
      ).toFixed(1)
    )
  }

  const adminAmount = calculateAmountPerParticipant(adminConsumption)

  const participantsAmounts = consumptions.map(item => ({
    name: item.name,
    amount: calculateAmountPerParticipant(Number(item.amount)),
  }))

  const result = [{ name: 'Principal', amount: adminAmount }, ...participantsAmounts]

  return result
}
