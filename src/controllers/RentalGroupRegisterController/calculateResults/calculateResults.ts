import { z } from 'zod'
import { schemaCalculateResults } from './calculateResults.schema'
import { Participant } from '@/models/Participant'
import { Tenant } from '@/models/Tenant'

type ArgsCalculateResultsFn = z.infer<typeof schemaCalculateResults>

export type ResponseCalculateResults = Array<{
  participant: Pick<Participant, 'is_main'> & {
    tenant: Pick<Tenant, 'alias'> & {
      consumption: number
      amount: number
    }
  }
}>

const IGV = 1.18

export async function calculateResults(args: ArgsCalculateResultsFn): Promise<ResponseCalculateResults | null> {
  const validation = schemaCalculateResults.safeParse(args)

  if (!validation.success) return null

  const { billData, consumptions } = args
  const { consumption_kwh, kwh_price, current_month_total, total } = billData

  //

  const quantityOfConsumptions = consumptions.length + 1

  const amountToBeAddedBeforeSubtotalWithIgv =
    (Number(current_month_total) / IGV - Number(consumption_kwh) * Number(kwh_price)) / quantityOfConsumptions

  const amountToAddAfterSubtotalWithIgv = (Number(total) - Number(current_month_total)) / quantityOfConsumptions

  const adminConsumptionKwh =
    Number(consumption_kwh) - consumptions.reduce((acc, item) => acc + Number(item.consumption), 0)

  function calculateAmountPerParticipant(consumption_kwh: number) {
    return Number(
      (
        (consumption_kwh * Number(kwh_price) + amountToBeAddedBeforeSubtotalWithIgv) * IGV +
        amountToAddAfterSubtotalWithIgv
      ).toFixed(1),
    )
  }

  const adminAmount = calculateAmountPerParticipant(adminConsumptionKwh)

  const participantsAmounts = consumptions.map(item => ({
    ...item,
    participant: {
      is_main: false,
      tenant: {
        alias: item.alias,
        consumption: item.consumption,
        amount: calculateAmountPerParticipant(Number(item.consumption)),
      },
    },
  }))

  //

  return [
    {
      participant: {
        is_main: true,
        tenant: {
          alias: 'Administrador',
          consumption: adminConsumptionKwh,
          amount: adminAmount,
        },
      },
    },
    ...participantsAmounts,
  ]
}
