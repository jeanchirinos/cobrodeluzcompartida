import { z } from 'zod'
import { schemaCalculateResults, schemaResponseCalculateResults } from './calculateResults.schema'

export const IGV = 0.18

type ArgsCalculateResultsFn = z.infer<typeof schemaCalculateResults>
export type ResponseCalculateResults = z.infer<typeof schemaResponseCalculateResults>

export async function calculateResults(args: ArgsCalculateResultsFn): Promise<ResponseCalculateResults> {
  const validation = schemaCalculateResults.safeParse(args)

  if (!validation.success) return []

  const { billData, consumptions } = args
  const { consumption_kwh, kwh_price, current_month_total, total } = billData

  //
  const igvToCalculate = IGV + 1
  const quantityOfConsumptions = consumptions.length + 1

  const amountToBeAddedBeforeSubtotalWithIgv =
    (current_month_total / igvToCalculate - consumption_kwh * kwh_price) / quantityOfConsumptions

  const amountToAddAfterSubtotalWithIgv = (total - current_month_total) / quantityOfConsumptions

  function calculateAmountPerParticipant(consumption_kwh: number) {
    return Number(
      (
        (consumption_kwh * kwh_price + amountToBeAddedBeforeSubtotalWithIgv) * igvToCalculate +
        amountToAddAfterSubtotalWithIgv
      ).toFixed(1),
    )
  }

  // Main participant
  const mainConsumptionKwh = consumption_kwh - consumptions.reduce((acc, item) => acc + item.consumption_kwh, 0)

  const mainAmount = calculateAmountPerParticipant(mainConsumptionKwh)

  const mainParticipantResult: ResponseCalculateResults[0] = {
    participant: {
      is_main: true,
    },
    tenant: {
      alias: 'Administrador',
    },
    consumption_kwh: mainConsumptionKwh,
    amount: mainAmount,
  }

  // Other participants
  const otherParticipantsResults: ResponseCalculateResults = consumptions.map(item => ({
    participant: {
      is_main: false,
    },
    tenant: {
      alias: item.alias,
    },
    consumption_kwh: item.consumption_kwh,
    amount: calculateAmountPerParticipant(item.consumption_kwh),
  }))

  return [mainParticipantResult, ...otherParticipantsResults]
}
