import { CalculateResults } from './calculateResults.schema'

export const IGV = 0.18

export function getMainParticipantConsumption(args: CalculateResults) {
  const { billData, consumptions } = args
  const { consumption_kwh } = billData

  const mainConsumptionKwh = consumption_kwh - consumptions.reduce((acc, item) => acc + item.consumption_kwh, 0)

  return mainConsumptionKwh
}

export function calculateAmountPerParticipant(
  args: {
    nConsumptions: number
    consumption_kwh: number
  } & Pick<CalculateResults, 'billData'>,
) {
  const { nConsumptions, billData, consumption_kwh } = args
  const { kwh_price, current_month_total, total, consumption_kwh: totalConsumptionKwh } = billData

  const igvToCalculate = IGV + 1

  const amountToBeAddedBeforeSubtotalWithIgv =
    (current_month_total / igvToCalculate - totalConsumptionKwh * kwh_price) / nConsumptions

  const amountToAddAfterSubtotalWithIgv = (total - current_month_total) / nConsumptions

  const amountToPay =
    (consumption_kwh * kwh_price + amountToBeAddedBeforeSubtotalWithIgv) * igvToCalculate +
    amountToAddAfterSubtotalWithIgv

  return Number(amountToPay.toFixed(1))
}
